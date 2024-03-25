export function calculateParkingCharge(arrival: Date, departure: Date): number {
  const current = new Date(arrival.getTime());
  let charge = 0;

  while (current < departure) {
    const hour = current.getHours();
    charge += (hour >= 8 && hour < 18) ? 2 : 1;
    current.setHours(current.getHours() + 1);
  }

  return charge;
}
