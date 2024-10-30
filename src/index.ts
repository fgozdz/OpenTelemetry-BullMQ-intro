import express from 'express';
import config from './config';
import router from './routes';
import pgClient from './db';

const app = express();

const port = config.port || 3000;

(async () => {
  await pgClient.init();
})();

app.use(express.json());

app.use(router);

app.listen(port, () => {
  console.log(`Listening ${port}`);
});