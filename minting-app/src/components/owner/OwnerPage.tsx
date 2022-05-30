import { Box, Container, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import useIsOwner from '../../hooks/useIsOwner';
const NftRequests = dynamic(() => import('./NftRequests'));

const OwnerPage = () => {
  const { isOwner, isSuccess, isLoading } = useIsOwner();
  return (
    <Container maxWidth='lg'>
      <Box
        sx={{
          my: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <>
          {isSuccess && !isOwner && isLoading && (
            <Typography variant='h4'>You are not the owner</Typography>
          )}
          {isSuccess && isOwner && (
            <>
              <Typography variant='h4' component='h1' gutterBottom>
                Minting requests
              </Typography>
              <NftRequests />
            </>
          )}
        </>
      </Box>
    </Container>
  );
};

export default OwnerPage;
