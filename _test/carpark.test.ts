import { createTestCarpark } from './factory/carpark.factory';
import request from './setup';

describe('Carpark Routes', () => {
  const testCarpark = { car_park_no: 'ACB' };
  beforeAll(async () => {
    await createTestCarpark({
      ...testCarpark,
    });
  });

  it('should get a list of car parks', async () => {
    const response = await request.get('/api/carparks');
    expect(response.status).toBe(200);
    expect(response.body.total).toBeDefined();
    expect(response.body.data).toBeInstanceOf(Array);
  });

  it('should get a car park by ID', async () => {
    const response = await request.get('/api/carparks/ACB');

    expect(response.status).toBe(200);
    expect(response.body.car_park_no).toBe(testCarpark.car_park_no);
  });

  it('should return 404 for a non-existent car park', async () => {
    const response = await request.get('/api/carparks/INVALID_ID');

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Car park not found');
  });
});
