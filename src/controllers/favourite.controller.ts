import { Request, Response } from 'express';
import { Favourite } from '../models/favourite.model';
import { Carpark } from '../models/carpark.model';

export const addFavourite = async (req: Request, res: Response) => {
  const { carparkId } = req.body;

  try {
    const carpark = await Carpark.findByPk(carparkId);
    if (!carpark) {
      return res.status(404).json({ message: 'Car park not found' });
    }

    const existingFavourite = await Favourite.findOne({
      where: { userId: req.user.id, carparkId },
    });
    if (existingFavourite) {
      return res.status(400).json({ message: 'Car park already favorited' });
    }

    const favourite = await Favourite.create({
      userId: req.user.id,
      carparkId,
    });

    res.status(201).json({
      message: 'Car park added to favorites',
      favourite,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error adding car park to favorites', error });
  }
};

export const removeFavourite = async (req: Request, res: Response) => {
  const { carparkId } = req.body;

  try {
    const carpark = await Carpark.findByPk(carparkId);
    if (!carpark) {
      return res.status(404).json({ message: 'Car park not found' });
    }

    const deletedCount = await Favourite.destroy({
      where: { userId: req.user.id, carparkId },
    });

    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ message: 'Car park not found in favorites' });
    }

    res.status(200).json({
      message: 'Car park removed from favorites',
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error removing car park from favorites', error });
  }
};

export const getFavourites = async (req: Request, res: Response) => {
  try {
    res.status(200).json({
      message: 'Favourite car parks retrieved successfully',
      favourites: await req.user.getCarparks(),
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving favorite car parks', error });
  }
};
