import createApp from './app';

const app = createApp();

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
