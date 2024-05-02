export interface Directors {
  movieId: number
  personId: number
}

export interface Movies {
  id: number | null
  title: string
  year: number | null
}

export interface People {
  id: number | null
  name: string
  birth: number | null
}

export interface Ratings {
  movieId: number
  rating: number
  votes: number
}

export interface Stars {
  movieId: number
  personId: number
}

export interface DB {
  directors: Directors
  movies: Movies
  people: People
  ratings: Ratings
  stars: Stars
}
