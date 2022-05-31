import { Box, Container, Typography } from '@mui/material';
import dynamic from 'next/dynamic';
import { useEffect, useMemo } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { contractArgs } from '../../constants';
import Loader from '../Loader';
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
          {isLoading && <Loader />}
          {isSuccess && !isOwner && !isLoading && (
            <Typography variant='h4'>You are not the owner</Typography>
          )}
          {isSuccess && isOwner && !isLoading && (
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

const useIsOwner = () => {
  const account = useAccount();
  const walletAddress = account?.data?.address;

  const { isSuccess, data, refetch, isLoading } = useContractRead(contractArgs, 'owner', {
    enabled: false,
    onSettled: (data) => {
      console.log('isowner response: ', data);
    },
  });

  useEffect(() => {
    if (!walletAddress) return;
    refetch();
  }, [walletAddress]);

  const isOwner = useMemo(() => {
    if (!isSuccess ?? !data ?? !walletAddress) return;
    const ownerAddress = data as unknown as string;
    return ownerAddress === walletAddress;
  }, [data, walletAddress]);

  return { isSuccess, isOwner, isLoading };
};

export default OwnerPage;
