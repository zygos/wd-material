// it is fine to use a for loop here, but we here we encourage
// you to practice using the array methods we have learned so far
export default function calculateTotalPrice(items: any) {
  let total = 0

  for (let i = 0; i < items.length; i++) {
    total += items[i].price
  }

  return total
}
