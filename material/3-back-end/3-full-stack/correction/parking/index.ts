export function calculateParkingCharge(arrival: Date, departure: Date): number {
  let charge = 0;
  let currentTime = new Date(arrival.getTime());

  while (currentTime < departure) {
    const hour = currentTime.getHours();
    if (hour >= 8 && hour < 18) {
      charge += 2;
    } else {
      charge += 1;
    }
    currentTime.setHours(currentTime.getHours() + 1);
  }

  return charge;
}
