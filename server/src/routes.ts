import express from 'express';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

const routes = express.Router();

routes.route('/items').get(ItemsController.index);

routes
  .route('/points')
  .post(PointsController.create)
  .get(PointsController.index);

routes.route('/points/:id').get(PointsController.show);

export default routes;
