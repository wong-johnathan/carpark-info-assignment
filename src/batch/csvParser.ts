/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import csv from 'csv-parser';
import { Carpark } from '../models/carpark.model';
import { sequelize } from '../config/db';

export const processCSV = async (filePath: string) => {
  const transaction = await sequelize.transaction();

  try {
    const records: any[] = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data: any) => records.push(data))
      .on('end', async () => {
        for (const record of records) {
          await Carpark.upsert(record, { transaction });
        }
        await transaction.commit();
        console.log('CSV processing completed successfully.');
      });
  } catch (error) {
    await transaction.rollback();
    console.error('Error processing CSV:', error);
  }
};
