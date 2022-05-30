import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
const OwnerPage = dynamic(() => import('../src/components/owner/OwnerPage'));

const Owner: NextPage = () => <OwnerPage />;

export default Owner;
