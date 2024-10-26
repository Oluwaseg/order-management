import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';
import connectDB from '../config/database.js';
import Order from '../models/Order.js';

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Order API', () => {
  let token;

  beforeAll(async () => {
    await Order.deleteMany();
    await request(app).post('/api/v1/auth/register').send({
      username: 'orderUser',
      password: 'password123',
    });
    const loginResponse = await request(app)
      .post('/api/v1/auth/login')
      .send({ username: 'orderUser', password: 'password123' });
    token = loginResponse.body.data.token;
  });

  test('Create a new order', async () => {
    const response = await request(app)
      .post('/api/v1/orders')
      .set('Authorization', `Bearer ${token}`)
      .send({ productId: '12345', quantity: 2 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('productId', '12345');
  });

  test('Get all orders', async () => {
    const response = await request(app)
      .get('/api/v1/orders')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('Get an order by ID', async () => {
    const newOrder = await Order.create({ productId: '67890', quantity: 1 });
    const response = await request(app)
      .get(`/api/v1/orders/${newOrder._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('productId', '67890');
  });

  test('Update an order', async () => {
    const newOrder = await Order.create({ productId: '99999', quantity: 1 });
    const response = await request(app)
      .patch(`/api/v1/orders/${newOrder._id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'shipped' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'shipped');
  });

  test('Delete an order', async () => {
    const newOrder = await Order.create({ productId: '11111', quantity: 1 });
    const response = await request(app)
      .delete(`/api/v1/orders/${newOrder._id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(204);
  });
});
