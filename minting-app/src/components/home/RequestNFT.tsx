import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useAccount } from 'wagmi';
import useNftRequests from '../../hooks/useNftRequests';

interface NftRequest {
  name: string;
  walletAddress: string;
}

const RequestNFT = () => {
  const account = useAccount();
  const [name, setName] = useState('');
  const { mutate } = useAddNftRequest();
  const onSubmit = (e: any) => {
    e.preventDefault();
    const walletAddress = account.data?.address;
    if (!walletAddress) return;
    mutate({ name, walletAddress });
  };
  const hasRequested = useHasRequested();
  return (
    <Container maxWidth='sm'>
      {!hasRequested && (
        <form onSubmit={onSubmit}>
          <Stack direction='column' spacing={2}>
            <TextField
              label='Wallet'
              variant='standard'
              fullWidth
              disabled
              value={account.data?.address ?? ''}
            />
            <TextField
              label='Your name'
              variant='standard'
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type='submit'>Submit</Button>
          </Stack>
        </form>
      )}
      {hasRequested && (
        <>
          <Typography variant='h4'>Request submitted!</Typography>
          <Typography variant='h4'>For until NFT is minted</Typography>
        </>
      )}
    </Container>
  );
};

const useHasRequested = () => {
  const account = useAccount();
  const nftRequests = useNftRequests();
  const address = account.data?.address;
  return useMemo(
    () => nftRequests?.some(({ walletAddress }) => walletAddress === address),
    [address, nftRequests]
  );
};

const useAddNftRequest = () => {
  const queryClient = useQueryClient();
  const addRequest = async (nftRequest: NftRequest) => {
    const { data } = await axios.post('/api/addrequest', nftRequest);
    return data;
  };
  return useMutation((nftRequest: NftRequest) => addRequest(nftRequest), {
    onSettled: (data) => {
      queryClient.invalidateQueries('nftRequests');
      console.log('successfully added nft request', data);
    },
  });
};

export default RequestNFT;
