import { Sequelize } from 'sequelize';
import { config } from './index';
import { initCarparkModel } from '../models/carpark.model';
import { initUserModel } from '../models/user.model';
import { Carpark } from '../models/carpark.model';
import { User } from '../models/user.model';
import { Favourite } from '../models/favourite.model';
import {
  initFavouriteModel,
  initFavouriteRelations,
} from '../models/favourite.model';
const { db, db_test } = config;

const isTestEnv = process.env.NODE_ENV === 'test';
const dbConfig = isTestEnv ? db_test : db;

export const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
    logging: false,
  },
);

export const initModels = (sequelize: Sequelize) => {
  initCarparkModel(sequelize);
  initUserModel(sequelize);
  initFavouriteModel(sequelize);
  initFavouriteRelations();
};

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    initModels(sequelize);
    await Carpark.sync();
    await User.sync();
    await Favourite.sync();
    console.log('Database connected successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};
