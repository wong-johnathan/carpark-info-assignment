import { createTestCarpark } from './factory/carpark.factory';
import request from './setup';

describe('Favourites Routes', () => {
  let authToken: string;
  const testCarpark = { car_park_no: 'ACB' };
  beforeAll(async () => {
    const loginResponse = await request.post('/api/auth/register').send({
      email: '123@example.com',
      password: 'password123',
      name: 'test',
      age: 20,
    });
    await createTestCarpark({
      ...testCarpark,
    });
    authToken = loginResponse.body.token;
  });

  it('should add a car park to favourites', async () => {
    const response = await request
      .post('/api/favourites')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ carparkId: testCarpark.car_park_no });
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Car park added to favorites');
    expect(response.body.favourite.carparkId).toBe(testCarpark.car_park_no);
  });

  it('should not add a car park to favourites if already favourited', async () => {
    const response = await request
      .post('/api/favourites')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ carparkId: testCarpark.car_park_no });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Car park already favorited');
  });

  it("should get the user's favourite car parks", async () => {
    const response = await request
      .get('/api/favourites')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe(
      'Favourite car parks retrieved successfully',
    );
    expect(response.body.favourites).toBeInstanceOf(Array);
  });

  it('should remove a car park from favourites', async () => {
    const response = await request
      .delete('/api/favourites')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ carparkId: testCarpark.car_park_no });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Car park removed from favorites');
  });

  it('should return 404 when removing a non-existent favourite', async () => {
    const response = await request
      .delete('/api/favourites')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ carparkId: 'INVALID_ID' });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Car park not found');
  });
});
