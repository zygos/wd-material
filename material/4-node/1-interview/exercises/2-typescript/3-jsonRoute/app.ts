import express, {
  type Response,
  type Request,
  type NextFunction,
} from 'express';
import { getMovieDetails, getUserBookings, processPayment } from './repository';
import { StatusCodes } from 'http-status-codes';

export default function createApp() {
  const app = express();

  app.get('/movie/:id', async (req, res, next) => {
    try {
      const movieId = parseInt(req.params.id, 10);

      if (typeof movieId !== 'number' || Number.isNaN(movieId)) {
        throw new Error('Invalid movie ID');
      }

      const movieDetails = await getMovieDetails(movieId);
      res.status(StatusCodes.OK).json(movieDetails);
    } catch (error) {
      next(error);
    }
  });

  app.get('/bookings/:userId', async (req, res, next) => {
    try {
      const userId = parseInt(req.params.userId, 10);

      if (typeof userId !== 'number' || Number.isNaN(userId)) {
        throw new Error('Invalid user ID');
      }

      const bookings = await getUserBookings(userId);
      res.status(StatusCodes.OK).json(bookings);
    } catch (error) {
      next(error);
    }
  });

  app.post('/payment', async (req, res, next) => {
    try {
      const paymentResult = await processPayment(req.body);
      res.status(StatusCodes.CREATED).json(paymentResult);
    } catch (error) {
      next(error);
    }
  });

  app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    if (!(error instanceof Error)) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: 'An unknown werror occurred' });

      return;
    }

    // we will ignore custom error status codes for this exercise
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  });

  return app;
}
