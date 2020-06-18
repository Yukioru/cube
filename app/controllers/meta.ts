import { RequestHandler } from 'express';
import getMeta from '../services/getMeta';

const meta: RequestHandler = async (req, res) => {
  try {
    let data = { status: 'down' };
    data = await getMeta();

    res.json(data);
  } catch (error) {
    return res.json({
      status: 'down',
    });
  }
};

export default meta;