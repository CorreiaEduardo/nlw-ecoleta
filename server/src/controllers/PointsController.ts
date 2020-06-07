import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async index(req: Request, res: Response) {
    console.log(req.query)
    const { city, uf, items = '' } = req.query;

    const parsedItems = String(items)
      .split(',')
      .map((item) => Number(item.trim()));

    const points = await knex('point')
      .join('point_item', 'point.id', '=', 'point_item.point_id')
      .whereIn('point_item.item_id', parsedItems)
      .where('city', String(city))
      .where('uf', String(uf))
      .distinct()
      .select('point.*');

    return res.json({ points });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const point = await knex('point').where('id', id).first();
    const items = await knex('item')
      .join('point_item', 'item.id', '=', 'point_item.item_id')
      .where('point_item.point_id', id)
      .select('item.title');

    if (!point) {
      return res.status(404).json({ message: 'Point not found' });
    }

    return res.json({ point, items });
  }

  async create(req: Request, res: Response) {
    const { name, email, whatsapp, lat, lng, city, uf, items } = req.body;

    const trx = await knex.transaction();

    const point = {
      image:
        'https://images.unsplash.com/photo-1556767576-5ec41e3239ea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
      name,
      email,
      whatsapp,
      lat,
      lng,
      city,
      uf,
    };

    const insertedIds = await trx('point').insert(point).returning('id');

    const pointId = insertedIds[0];

    const pointItems = items.map((itemId: number) => {
      return {
        item_id: itemId,
        point_id: pointId,
      };
    });

    await trx('point_item').insert(pointItems);

    await trx.commit();

    return res.json({
      id: pointId,
      ...point,
    });
  }
}

export default new PointsController();
