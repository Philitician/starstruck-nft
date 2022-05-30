import { NextApiRequest, NextApiResponse } from 'next';
import { notion } from '../../src/notion/notionClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body;
  await notion.pages.update({
    page_id: id,
    properties: {
      Minted: {
        checkbox: true,
      },
    },
  });
  res.status(200).json('Success!');
};
