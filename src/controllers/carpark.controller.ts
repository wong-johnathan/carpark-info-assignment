import { Request, Response } from 'express';
import { Carpark } from '../models/carpark.model';
import { Op } from 'sequelize';

export const getCarParks = async (req: Request, res: Response) => {
  const {
    page = 1,
    limit = 10,
    free_parking = false,
    night_parking = false,
    gantry_height,
  } = req.query;

  const offset = (Number(page) - 1) * Number(limit);

  const whereClause: { [key: string]: unknown } = {};
  if (free_parking) whereClause.free_parking = { [Op.ne]: 'NO' };
  if (night_parking) whereClause.night_parking = 'YES';
  if (gantry_height)
    whereClause.gantry_height = { [Op.gte]: Number(gantry_height) };

  try {
    const { count, rows } = await Carpark.findAndCountAll({
      where: whereClause,
      limit: Number(limit),
      offset: offset,
    });

    res.status(200).json({
      total: count,
      page: Number(page),
      limit: Number(limit),
      data: rows,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car parks', error });
  }
};

export const getCarParkById = async (req: Request, res: Response) => {
  const { car_park_no } = req.params;
  try {
    const carPark = await Carpark.findOne({ where: { car_park_no } });
    if (!carPark) {
      return res.status(404).json({ message: 'Car park not found' });
    }
    res.status(200).json(carPark);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching car park', error });
  }
};
