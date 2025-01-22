import { DataTypes, Model, Sequelize } from 'sequelize';

export class Carpark extends Model {
  public car_park_no!: string;
  public address!: string;
  public x_coord!: number;
  public y_coord!: number;
  public car_park_type!: string;
  public type_of_parking_system!: string;
  public short_term_parking!: string;
  public free_parking!: string;
  public night_parking!: string;
  public car_park_decks!: number;
  public gantry_height!: number;
  public car_park_basement!: string;

  static async getCarParkById(car_park_no: string): Promise<Carpark | null> {
    return this.findOne({ where: { car_park_no } });
  }

  static async updateCarPark(
    car_park_no: string,
    updateData: Partial<Carpark>,
  ): Promise<[number, Carpark[]]> {
    return this.update(updateData, { where: { car_park_no }, returning: true });
  }

  static async deleteCarPark(car_park_no: string): Promise<number> {
    return this.destroy({ where: { car_park_no } });
  }
}

export const initCarparkModel = (sequelize: Sequelize) => {
  Carpark.init(
    {
      car_park_no: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      x_coord: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      y_coord: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      car_park_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type_of_parking_system: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      short_term_parking: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      free_parking: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      night_parking: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      car_park_decks: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      gantry_height: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      car_park_basement: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'car_parks',
    },
  );
};
