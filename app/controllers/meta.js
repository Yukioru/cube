import getMeta from '../services/getMeta';

export default async (req, res) => {
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

