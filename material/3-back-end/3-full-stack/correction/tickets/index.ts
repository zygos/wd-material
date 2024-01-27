export function calculateTicketPrice(date: Date, age: number): number {
  const isWednesday = date.getDay() === 3; // 3 represents Wednesday
  const regularPrice = 12;
  let discount = 0;

  if (age >= 65 || age < 12) {
    discount = 0.3; // 30% discount for seniors and children
  } else if (isWednesday && age < 25) {
    discount = 0.2; // 20% discount for adults under 25
  }

  return Math.round(regularPrice * (1 - discount) * 10) / 10;
}
