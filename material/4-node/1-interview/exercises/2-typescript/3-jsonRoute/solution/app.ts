import express, {
  type Response,
  type Request,
  type NextFunction,
} from 'express';
import {
  getMovieDetails,
  getUserBookings,
  processPayment,
  type Movie,
} from './repository';
import { jsonRoute } from './jsonRoute';
import { StatusCodes } from 'http-status-codes';

export default function createApp() {
  const app = express();

  app.get(
    '/movie/:id',
    jsonRoute<Movie>((req) => {
      const movieId = parseInt(req.params.id);

      if (typeof movieId !== 'number' || Number.isNaN(movieId)) {
        throw new Error('Invalid movie ID');
      }

      return getMovieDetails(movieId);
    }),
  );

  app.get(
    '/bookings/:userId',
    jsonRoute((req) => {
      const userId = parseInt(req.params.userId);

      if (typeof userId !== 'number' || Number.isNaN(userId)) {
        throw new Error('Invalid user ID');
      }

      return getUserBookings(userId);
    }),
  );

  app.post(
    '/payment',
    jsonRoute((req) => {
      return processPayment(req.body);
    }, StatusCodes.CREATED),
  );

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
