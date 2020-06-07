import express from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

import multerConfig from './config/multer';

import CreatePointSchema from './schemas/CreatePointSchema';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();
const upload = multer(multerConfig);

routes.route('/items').get(ItemsController.index);

routes
  .route('/points')
  .get(PointsController.index)
  .post(
    upload.single('image'),
    celebrate(
      { body: Joi.object().keys(CreatePointSchema) },
      { abortEarly: false }
    ),
    PointsController.create
  );

routes.route('/points/:id').get(PointsController.show);

export default routes;
