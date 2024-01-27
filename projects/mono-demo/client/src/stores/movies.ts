import { defineStore } from 'pinia'
import { trpc } from './trpc'

export default defineStore('movies', () => {
  const getMovies = (ids: number[]) =>
    trpc.getMovies.query({
      ids
    })

  return { getMovies }
})
