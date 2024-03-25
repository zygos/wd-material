import { describe, expect, it, vi, beforeEach } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
// import { setActivePinia, createPinia } from 'pinia'
import { defineStore } from 'pinia';
import { ref } from 'vue';

type Category = {
  id: string
  name: string
}

const pinia = createTestingPinia({
  createSpy: vi.fn,
  stubActions: false,
})


// const pinia = createPinia()

const useCategoryStore = defineStore('category', () => {
  const categories = ref<Category[]>([]);
  // const categories = ref<string[]>([]);

  function addCategory(name: string) {
    const id = Math.random().toString(36).substr(2, 9);

    categories.value = [...categories.value, { id, name }];
    // categories.value.push({ id, name });
    // categories.value.push(name);

    localStorage.setItem('categories', JSON.stringify(categories.value));
  }

  return {
    categories,
    addCategory,
  };
})

describe('Category Store', () => {
  // beforeEach(() => {
  //   setActivePinia(createPinia())
  // })

  it('adds category', async () => {
    localStorage.setItem('categories', JSON.stringify([]))

    const categoryStore = useCategoryStore(pinia)
    expect(categoryStore.categories).toEqual([])
    categoryStore.addCategory('test')
    expect(categoryStore.categories).toEqual([
      { id: expect.any(String), name: 'test' }
    ])
  })
})
