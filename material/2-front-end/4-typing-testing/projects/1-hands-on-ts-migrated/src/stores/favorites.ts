import { ref, shallowReadonly, watch } from 'vue';
import type { Apod } from '@/stores/apod';
import { setError } from './errors';

const FAVORITES_KEY = 'favorites';
const favorites = ref(getStoredFavorites());

function getStoredFavorites(): Apod[] {
  try {
    const favoritesStored = localStorage.getItem(FAVORITES_KEY);

    return favoritesStored ? JSON.parse(favoritesStored) : [];
  } catch (error) {
    return [];
  }
}

watch(favorites, (favoritesUpdated) => {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favoritesUpdated));
  } catch (error) {
    setError(
      new Error(
        'Could not store your favorites. You might need to refresh the page',
        { cause: error }
      )
    );
  }
});

export function isFavorite(apod: Apod) {
  return favorites.value.some((favorite) => favorite.date === apod.date);
}

export function toggleFavorite(apod: Apod) {
  const favoritesUpdated = isFavorite(apod)
    ? favorites.value.filter((favorite: Apod) => favorite.date !== apod.date)
    : [...favorites.value, apod];

  favorites.value = favoritesUpdated;
}

export const favoritesList = shallowReadonly(favorites);
