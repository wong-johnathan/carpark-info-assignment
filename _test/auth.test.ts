import request from './setup';

describe('Auth Routes', () => {
  const testUser = {
    name: 'Test User',
    age: 25,
    email: 'test@example.com',
    password: 'password123',
  };

  it('should register a new user', async () => {
    const response = await request.post('/api/auth/register').send(testUser);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Account created successfully');
    expect(response.body.user.email).toBe(testUser.email);
    expect(response.body.token).toBeDefined();
  });

  it('should not register a user with an existing email', async () => {
    const response = await request.post('/api/auth/register').send(testUser);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email already exists');
  });

  it('should login a user with valid credentials', async () => {
    const response = await request.post('/api/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Login successful');
    expect(response.body.user.email).toBe(testUser.email);
    expect(response.body.token).toBeDefined();
  });

  it('should not login a user with invalid credentials', async () => {
    const response = await request.post('/api/auth/login').send({
      email: testUser.email,
      password: 'wrongpassword',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Invalid email or password');
  });
});
