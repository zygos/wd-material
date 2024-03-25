import { generateDocument } from './shared';

// 3 requests are made at the same time, our underlying system can only handle one
// document generation at a time, so this will crash.
generateDocument({
  id: 1,
  amount: 100,
  date: '2024-01-01',
});

generateDocument({
  id: 2,
  amount: 200,
  date: '2024-01-02',
});

generateDocument({
  id: 3,
  amount: 300,
  date: '2024-01-03',
});
