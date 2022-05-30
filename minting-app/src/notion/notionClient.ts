import { Client } from '@notionhq/client';

const token = process.env.NEXT_PUBLIC_NOTION_TOKEN;
export const databaseId = process.env.NEXT_PUBLIC_NOTION_DATABASE_ID ?? '';

// Initializing a client
export const notion = new Client({
  auth: token,
});

export interface NftRequest {
  id: string;
  name: string;
  walletAddress: string;
  minted: boolean;
}
