export default function calculateTotalPrice(items) {
  let totalPrice = 0

  for (let i = 0; i < items.length; i++) {
    totalPrice += items[i].price
  }

  return totalPrice
}
