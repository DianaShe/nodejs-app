const request = require('supertest');

const app = require('../../../app');

describe('POST /users/login', () => {

  it('should return user object and jwt', async () => {
    const testData = {
      email: "Kate@mail.com",
      password: '777777',
    };

    const res = await request(app).post('/api/users/login').send(testData);
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        user: expect.any(Object),
      })
    );
  }, 1000000);

  it('should return unauth error', async () => {
    const testData = {
      email: 'oleg@mail.com',
      password: 'Pass&1234',
    };

    const res = await request(app).post('/api/users/login').send(testData);

    expect(res.statusCode).toBe(401);
  },  1000000);

  it('should return unauth error', async () => {
    const testData = {
      email: 'olegA@mail.com',
      password: '777777',
    };

    const res = await request(app).post('/api/users/login').send(testData);

    expect(res.statusCode).toBe(401);
  }, 1000000);

  it('should return unauth error', async () => {
    const testData = {
      email: 'oleg@mail.com',
    };

    const res = await request(app).post('/api/users/login').send(testData);

    expect(res.statusCode).toBe(400);
  });
});