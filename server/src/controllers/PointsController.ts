import { Request, Response } from 'express';
import knex from '../database/connection';

class PointsController {
  async index(req: Request, res: Response) {
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

    const serializedPoints = await Promise.all(
      points.map(async (point) => {
        const pointItems = await knex('item')
          .join('point_item', 'item.id', '=', 'point_item.item_id')
          .where('point_item.point_id', point.id)
          .select('item.title');

        const serialized = {
          ...point,
          items: pointItems,
          imageUrl: `${process.env.HOST_URL}/uploads/${point.image}`,
        };

        return serialized;
      })
    );

    return res.json({ points: serializedPoints });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const point = await knex('point').where('id', id).first();

    if (!point) {
      return res.status(404).json({ message: 'Point not found' });
    }

    const items = await knex('item')
      .join('point_item', 'item.id', '=', 'point_item.item_id')
      .where('point_item.point_id', id)
      .select('item.title');

    const serializedPoint = {
      ...point,
      imageUrl: `${process.env.HOST_URL}/uploads/${point.image}`,
    };

    return res.json({ point: serializedPoint, items });
  }

  async create(req: Request, res: Response) {
    const { name, email, whatsapp, lat, lng, city, uf, items } = req.body;

    const trx = await knex.transaction();

    const point = {
      image: req.file.filename,
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

    const pointItems = items
      .split(',')
      .map((item: string) => Number(item.trim()))
      .map((itemId: number) => {
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
