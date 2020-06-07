import { Request, Response } from 'express';
import knex from '../database/connection';

class ItemsController {
  async index(req: Request, res: Response) {
    const items = await knex('item').select('*');

    const serializedItems = items.map((item) => {
      return {
        id: item.id,
        title: item.title,
        imageUrl: `${process.env.HOST_URL}/uploads/${item.image}`,
      };
    });

    return res.json({ items: serializedItems });
  }
}

export default new ItemsController();
