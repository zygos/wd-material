import { describe, it, expect } from 'vitest';
import { calculateTicketPrice } from '.';

describe('calculateTicketPrice', () => {
  it('charges $12 for a regular adult ticket', () => {
    const date = new Date('2023-04-01T14:00:00'); // Not a Wednesday
    const age = 30;
    expect(calculateTicketPrice(date, age)).toBe(12);
  });

  it('charges $9.6 for adults under 25 on Wednesdays', () => {
    const date = new Date('2023-04-05T14:00:00'); // A Wednesday
    const age = 24;
    expect(calculateTicketPrice(date, age)).toBe(9.6);
  });

  it('charges $8.4 for seniors every day', () => {
    const date = new Date('2023-04-01T14:00:00');
    const age = 65;
    expect(calculateTicketPrice(date, age)).toBe(8.4);
  });

  it('charges $8.4 for children every day', () => {
    const date = new Date('2023-04-01T14:00:00');
    const age = 10;
    expect(calculateTicketPrice(date, age)).toBe(8.4);
  });

  it('charges $12 for adults 25 or older on Wednesdays', () => {
    const date = new Date('2023-04-05T14:00:00'); // A Wednesday
    const age = 25;
    expect(calculateTicketPrice(date, age)).toBe(12);
  });
});
