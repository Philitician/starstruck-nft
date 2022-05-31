import DeleteIcon from '@mui/icons-material/Delete';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import axios from 'axios';
import { useRef } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useContractWrite } from 'wagmi';
import { contractArgs } from '../../constants';
import { NftRequest } from '../../notion/notionClient';

const NftRequests = () => {
  const nftRequests = useNftRequests();
  const mintTo = useMintNft();
  return (
    <List sx={{ minWidth: 600 }}>
      {nftRequests?.map(({ id, name, walletAddress, minted }) => (
        <>
          <ListItem
            key={walletAddress}
            disablePadding
            disabled={minted}
            secondaryAction={
              <>
                {!minted && (
                  <Button
                    variant='contained'
                    color='secondary'
                    sx={{ m: 0.5, borderRadius: 20 }}
                    onClick={() => mintTo(walletAddress, id)}
                  >
                    MINT
                  </Button>
                )}
                <IconButton sx={{ m: 0.5 }}>
                  <DeleteIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText primary={name} secondary={walletAddress} />
          </ListItem>
          <Divider />
        </>
      ))}
    </List>
  );
};

const useNftRequests = () => {
  const fetchNftRequests = async () => {
    const { data } = await axios.get<NftRequest[]>('/api/nftrequests');
    return data;
  };
  const { data } = useQuery(['nftrequests'], fetchNftRequests);
  return data;
};

const useMintNft = () => {
  const { mutate } = useCheckRequestedNftAsMinted();
  const request = useRef<string>();
  const { write } = useContractWrite(contractArgs, 'mintTo', {
    onSettled: () => {
      if (!request.current) return;
      mutate(request.current);
      request.current = undefined;
    },
  });
  const mintTo = (receiver: string, requestId: string) => {
    request.current = requestId;
    write({ args: [receiver] });
  };
  return mintTo;
};

const useCheckRequestedNftAsMinted = () => {
  const queryClient = useQueryClient();
  const checkAsMinted = async (requestId: string) => {
    await axios.put(`/api/markrequest`, {
      id: requestId,
    });
  };
  return useMutation(checkAsMinted, {
    onSettled: () => queryClient.invalidateQueries('nftRequests'),
  });
};

export default NftRequests;
