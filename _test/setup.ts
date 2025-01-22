import supertest from 'supertest';
import app from '../src/app';

import { initModels, sequelize } from '../src/config/db';
import { User } from '../src/models/user.model';
import { Carpark } from '../src/models/carpark.model';
import { Favourite } from '../src/models/favourite.model';

beforeAll(async () => {
  try {
    await sequelize.authenticate();
    initModels(sequelize);

    await Carpark.sync({ force: true });
    await User.sync({ force: true });
    await Favourite.sync({ force: true });
  } catch (error) {
    console.error('Error during test setup:', error);
  }
});

afterAll(async () => {
  try {
    await sequelize.close();
  } catch (error) {
    console.error('Error during test teardown:', error);
  }
});

const request = supertest(app);

export default request;
