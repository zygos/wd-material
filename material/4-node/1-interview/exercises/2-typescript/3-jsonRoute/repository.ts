export type Movie = {
  id: number;
  title: string;
  director: string;
  year: number;
};

// Async just to simulate a real database call
export async function getMovieDetails(movieId: number): Promise<Movie> {
  return {
    id: movieId,
    title: 'Inception',
    director: 'Christopher Nolan',
    year: 2010,
  };
}

export async function getUserBookings(userId: number) {
  return [
    {
      id: 1,
      movieId: 1,
      userId,
      date: '2021-01-01',
      time: '19:00',
    },
    {
      id: 2,
      movieId: 1,
      userId,
      date: '2021-01-01',
      time: '21:00',
    },
  ];
}

export async function processPayment(paymentDetails: unknown) {
  return {
    success: true,
    transaction: '123456',
  };
}
