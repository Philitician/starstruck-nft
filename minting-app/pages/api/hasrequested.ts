import type { NextApiRequest, NextApiResponse } from 'next';
import { databaseId, notion } from '../../src/notion/notionClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const walletAddress = req.query.walletAddress as string;

  const { results } = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: 'WalletAddress',
      rich_text: {
        equals: walletAddress,
      },
    },
  });

  res.status(200).json(results.length > 0);
};
