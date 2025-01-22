import app from './app';
import { processCSV } from './batch/csvParser';
import { config } from './config';
import { connectDB } from './config/db';

const { port } = config;
const startServer = async () => {
  await connectDB();
  await processCSV('hdb-carpark-information-20220824010400.csv');
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

startServer();
