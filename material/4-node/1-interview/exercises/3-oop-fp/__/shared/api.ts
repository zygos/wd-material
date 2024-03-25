import { setTimeout } from 'timers/promises';

export async function fetchTemperature(date: Date): Promise<number> {
  await setTimeout(100);

  // fake implementation
  return 20 + date.getDay();
}

export async function fetchWindSpeed(date: Date): Promise<number> {
  await setTimeout(100);

  // fake implementation
  return 10 + date.getDay();
}
