import type { NextApiRequest, NextApiResponse } from 'next';
import { databaseId, notion } from '../../src/notion/notionClient';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { results } = await notion.databases.query({
    database_id: databaseId,
  });
  const pages: any[] = results;
  const nftRequests = pages.map((page) => {
    const id: string = page.id;
    const name: string = page.properties.Name.title[0].plain_text;
    const walletAddress: string = page.properties.WalletAddress.rich_text[0].plain_text;
    const minted: string = page.properties.Minted.checkbox;
    return { id, name, walletAddress, minted };
  });
  res.status(200).json(nftRequests);
};
