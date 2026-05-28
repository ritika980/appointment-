const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
  process.env.NODE_ENV = 'test';
  app = require('../server');
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany();
  }
});

async function registerAndLogin() {
  await request(app).post('/api/auth/register').send({
    name: 'Appt User',
    email: 'appt@example.com',
    password: 'password123',
  });

  const res = await request(app).post('/api/auth/login').send({
    email: 'appt@example.com',
    password: 'password123',
  });

  return res.body.token;
}

describe('Appointments API', () => {
  test('creates, reads, updates, and deletes an appointment', async () => {
    const token = await registerAndLogin();

    const apptData = {
      patientName: 'John Doe',
      doctorName: 'Dr. Smith',
      appointmentDate: '2026-06-01',
      appointmentTime: '10:00',
      reason: 'Checkup',
    };

    const createRes = await request(app)
      .post('/api/appointments')
      .set('Authorization', `Bearer ${token}`)
      .send(apptData);

    expect(createRes.statusCode).toBe(201);
    expect(createRes.body.appointment).toMatchObject({ patientName: 'John Doe' });

    const getRes = await request(app)
      .get('/api/appointments')
      .set('Authorization', `Bearer ${token}`);

    expect(getRes.statusCode).toBe(200);
    expect(getRes.body.appointments.length).toBe(1);

    const id = createRes.body.appointment._id;

    const singleRes = await request(app)
      .get(`/api/appointments/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(singleRes.statusCode).toBe(200);
    expect(singleRes.body.appointment._id).toBe(id);

    const updateRes = await request(app)
      .put(`/api/appointments/${id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ reason: 'Updated Reason' });

    expect(updateRes.statusCode).toBe(200);
    expect(updateRes.body.appointment.reason).toBe('Updated Reason');

    const deleteRes = await request(app)
      .delete(`/api/appointments/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(deleteRes.statusCode).toBe(200);

    const finalGet = await request(app)
      .get('/api/appointments')
      .set('Authorization', `Bearer ${token}`);

    expect(finalGet.body.appointments.length).toBe(0);
  });
});
