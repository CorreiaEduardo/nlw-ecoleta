import express from 'express';
import cors from 'cors';
import path from 'path';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

const port = 3333;
app.listen(port, () => {
  console.log(`Starting nlw-ecoleta-server on port ${port}`);
});
