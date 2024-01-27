import { defineStore } from 'pinia'
import { trpc } from './trpc'

export default defineStore('movies', () => {
  const getMovies = (ids: number[]) =>
    trpc.getMovies.query({
      ids
    })

  const getMovieFull = (id: number) =>
    trpc.getMovieFull.query({
      id
    })

  return { getMovies, getMovieFull }
})
