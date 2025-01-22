import { DataTypes, Model, Sequelize } from 'sequelize';
import { User } from './user.model';
import { Carpark } from './carpark.model';

export class Favourite extends Model {
  public userId!: number;
  public carparkId!: string;
}

export const initFavouriteModel = (sequelize: Sequelize) => {
  Favourite.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: User,
          key: 'id',
        },
      },
      carparkId: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: Carpark,
          key: 'car_park_no',
        },
      },
    },
    {
      sequelize,
      tableName: 'favourites',
      indexes: [
        {
          unique: true,
          fields: ['userId', 'carparkId'],
        },
      ],
    },
  );
};

export const initFavouriteRelations = () => {
  User.belongsToMany(Carpark, {
    through: Favourite,
    foreignKey: 'userId',
    as: 'carparks',
  });
  Carpark.belongsToMany(User, {
    through: Favourite,
    foreignKey: 'carparkId',
    as: 'users',
  });
};
