import type { NextApiRequest, NextApiResponse } from 'next';
import { databaseId, notion } from '../../src/notion/notionClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { name, walletAddress } = req.body;

  try {
    const response = await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        Name: {
          type: 'title',
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        WalletAddress: {
          type: 'rich_text',
          rich_text: [
            {
              text: {
                content: walletAddress,
              },
            },
          ],
        },
        Minted: {
          checkbox: false,
        },
      },
    });
    console.log(response);
    console.log('Success! Entry added.');
    return res.status(200).json(response.object);
  } catch (error) {
    console.error('error', error);
    return res.status(error as any);
  }
};
