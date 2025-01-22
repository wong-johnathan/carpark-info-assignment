import express, { Request, Response, NextFunction } from 'express';
import routes from './routes/index';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', routes);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

export default app;
