import request from 'supertest';
import { describe, it, expect } from 'vitest';
import createApp from './app';

const app = createApp();

describe('GET /movie/:id', () => {
  it('should return movie details', async () => {
    const response = await request(app).get('/movie/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      id: 1,
      title: 'Inception',
      director: 'Christopher Nolan',
      year: 2010,
    });
  });

  it('should return an error if the movie does not exist', async () => {
    const response = await request(app).get('/movie/not_a_number');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Invalid movie ID' });
  });
});

describe('GET /bookings/:userId', () => {
  it('should return user bookings', async () => {
    const response = await request(app).get('/bookings/1');

    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      {
        id: 1,
        movieId: 1,
        userId: 1,
        date: '2021-01-01',
        time: '19:00',
      },
      {
        id: 2,
        movieId: 1,
        userId: 1,
        date: '2021-01-01',
        time: '21:00',
      },
    ]);
  });
});

describe('POST /payment', () => {
  it('should process payment', async () => {
    const response = await request(app)
      .post('/payment')
      .send({ amount: 100, cardNumber: '1234-5678-9012-3456' });

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      transaction: '123456',
    });
  });
});
