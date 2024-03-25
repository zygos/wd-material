import { it, expect } from 'vitest';
import { calculateParkingCharge } from '.';

it('charges 2 euros per hour during the day (8-18)', () => {
  const arrival = new Date('2023-04-01T08:00:00');
  const departure = new Date('2023-04-01T10:00:00'); // 2 hours later
  expect(calculateParkingCharge(arrival, departure)).toBe(4);
});

it('charges 1 euro per hour during the night', () => {
  const arrival = new Date('2023-04-01T19:00:00');
  const departure = new Date('2023-04-01T21:00:00'); // 2 hours later
  expect(calculateParkingCharge(arrival, departure)).toBe(2);
});

it('charges mixed rates for overnight parking', () => {
  const arrival = new Date('2023-04-01T17:00:00');
  const departure = new Date('2023-04-01T20:00:00'); // 3 hours later, 1 hour at day rate, 2 hours at night rate
  expect(calculateParkingCharge(arrival, departure)).toBe(4);
});
