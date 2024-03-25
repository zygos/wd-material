import { defineStore } from 'pinia';
import { ref } from 'vue';

type Category = {
  id: string
  name: string
}

export const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([]);

  function addCategory(name: string) {
    const id = Math.random().toString(36).substr(2, 9);

    // categories.value = [...categories.value, { id, name }];
    categories.value.push({ id, name });

    // localStorage.setItem('categories', JSON.stringify(categories.value));
  }

  return {
    categories,
    addCategory,
  };
})
