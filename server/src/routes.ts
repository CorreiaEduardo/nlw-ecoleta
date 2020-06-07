import express from 'express';
import multer from 'multer';
import { celebrate, Joi } from 'celebrate';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

import multerConfig from './config/multer';

const routes = express.Router();
const upload = multer(multerConfig);

routes.route('/items').get(ItemsController.index);

routes
  .route('/points')
  .post(
    upload.single('image'),
    celebrate(
      {
        body: Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().required().email(),
          whatsapp: Joi.number().required(),
          lat: Joi.number().required(),
          lng: Joi.number().required(),
          uf: Joi.string().required().max(2),
          city: Joi.string().required(),
          items: Joi.string().required(),
        }),
      },
      {
        abortEarly: false,
      }
    ),
    PointsController.create
  )
  .get(PointsController.index);

routes.route('/points/:id').get(PointsController.show);

export default routes;
