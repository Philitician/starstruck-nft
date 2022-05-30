import { createAlchemyWeb3, Nft, NftMetadata } from '@alch/alchemy-web3';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { alchemyUrl, contractAddress } from '../../constants';
import useGetNftIdOfOwner from '../../hooks/useGetNftUriOfAccount';
import NftCard from './NftCard';
import RequestNFT from './RequestNFT';

const DisplayOrRequestNFT = () => {
  const { id, isSuccess, isLoading, error } = useGetNftIdOfOwner();
  const nftMetadata = useNftMetadata(id);
  return (
    <>
      {isLoading && <Loading />}
      {!isSuccess && !isLoading && <RequestNFT />}
      {isSuccess && id && (
        <>
          <NftCard {...nftMetadata} />
        </>
      )}
    </>
  );
};

const Loading = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CircularProgress size={150} />
    </Box>
  );
};

interface StarstruckMetadata extends NftMetadata {
  date: string;
  location: string;
}

interface StarstruckMedia {
  gateway: string;
}

interface StarstruckNft extends Omit<Nft, 'metadata' | 'media'> {
  metadata: StarstruckMetadata;
  media: StarstruckMedia[];
}

const useNftMetadata = (id: string | undefined) => {
  const web3 = createAlchemyWeb3(alchemyUrl);

  const getNftMetadata = async (tokenId: string | undefined) => {
    if (!tokenId) return;
    const metadata = await web3.alchemy.getNftMetadata({
      contractAddress,
      tokenId,
    });
    return metadata as StarstruckNft;
  };
  const { data } = useQuery(['metadata', id], () => getNftMetadata(id));

  return useMemo(() => {
    console.log('data', data);
    const imgUrl = data?.media?.[0].gateway ?? '';
    const description = data?.description ?? '';
    const location = data?.metadata?.location ?? '';
    const date = data?.metadata?.date ?? '';
    return { imgUrl, description, location, date };
  }, [data]);
};

export default DisplayOrRequestNFT;
