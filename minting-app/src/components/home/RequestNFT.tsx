import { Button, Container, Stack, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useAccount } from 'wagmi';

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
        <Stack alignItems='center'>
          <Typography variant='h4'>Request submitted!</Typography>
          <Typography variant='h4'>Wait for your NFT to be minted...</Typography>
        </Stack>
      )}
    </Container>
  );
};

const fetchNftRequests = async (walletAddress: string) => {
  const { data } = await axios.get<boolean>(`/api/hasrequested?walletAddress=${walletAddress}`);
  return data;
};

const useHasRequested = () => {
  const account = useAccount();
  const walletAddress = account.data?.address;

  const { data } = useQuery(['hasrequested'], () => fetchNftRequests(walletAddress!));

  return useMemo(() => {
    if (!data || !walletAddress) return;
    return data;
  }, [walletAddress, data]);
};

const useAddNftRequest = () => {
  const queryClient = useQueryClient();
  const addRequest = async (nftRequest: NftRequest) => {
    const { data } = await axios.post('/api/addrequest', nftRequest);
    return data;
  };
  return useMutation((nftRequest: NftRequest) => addRequest(nftRequest), {
    onSettled: (data) => {
      queryClient.invalidateQueries('hasrequested');
    },
  });
};

export default RequestNFT;
