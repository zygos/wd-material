import { ref } from 'vue'

export default function counter() {
  const count = ref(0)

  function setCounter(value) {
    count.value = value
  }

  return { count, setCounter }
}
