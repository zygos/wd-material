// our function does not care about other properties
type Priced = {
  price: number
}

export default function calculateTotalPrice(items: Priced[]) {
  return items.reduce((total, item) => total + item.price, 0)
}
