import DeleteIcon from '@mui/icons-material/Delete';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import useMintNft from '../../hooks/useMintNft';
import useNftRequests from '../../hooks/useNftRequests';

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

export default NftRequests;
