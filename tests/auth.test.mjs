import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';
import connectDB from '../config/database.js';
import User from '../models/User.js';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Auth API', () => {
  beforeAll(async () => {
    await User.deleteMany();
  });

  test('Register a new user', async () => {
    const response = await request(app)
      .post('/api/v1/auth/register')
      .send({ username: 'testuser', password: 'password123' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('data.username', 'testuser');
  });

  test('Login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'testuser', password: 'password123' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data.token');
  });

  test('Fail login with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'testuser', password: 'wrongpassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('Invalid credentials');
  });

  test('Logout successfully', async () => {
    const response = await request(app).post('/api/v1/auth/logout');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Logged out successfully');
  });
});
