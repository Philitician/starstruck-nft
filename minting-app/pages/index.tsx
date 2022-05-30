import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useAccount } from 'wagmi';
const DisplayNFT = dynamic(() => import('../src/components/home/DisplayOrRequestNFT'));

const Home: NextPage = () => {
  const account = useAccount();
  const accountAddress = account?.data?.address;

  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          my: 20,
          justifyContent: 'center',
          alignItems: 'center',
          display: 'flex',
        }}
      >
        {accountAddress && <DisplayNFT />}
      </Box>
    </Container>
  );
};

export default Home;
