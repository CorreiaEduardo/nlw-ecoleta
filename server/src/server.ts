import express from 'express';
import cors from 'cors';
import path from 'path';
import { errors } from 'celebrate';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(errors());

app.listen(process.env.APP_PORT, () => {
  console.log(`👌 Starting nlw-ecoleta-server on port ${process.env.APP_PORT}`);
});
