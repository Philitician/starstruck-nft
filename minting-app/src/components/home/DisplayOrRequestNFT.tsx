import axios from 'axios';
import { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { useAccount, useContractRead } from 'wagmi';
import { contractArgs, gatewayBaseUrl } from '../../constants';
import { Metadata } from '../../types/Metadata';
import Loader from '../Loader';
import NftCard from './NftCard';
import RequestNFT from './RequestNFT';

const DisplayOrRequestNFT = () => {
  const { nftUri, isSuccess, isLoading } = useGetNftUriOfAccount();
  const nftMetadata = useNftMetadata(nftUri);
  return (
    <>
      {isLoading && <Loader />}
      {!isSuccess && !isLoading && <RequestNFT />}
      {isSuccess && nftMetadata && (
        <>
          <NftCard {...nftMetadata} />
        </>
      )}
    </>
  );
};

const useGetNftUriOfAccount = () => {
  const account = useAccount();
  const accountAddress = account?.data?.address;

  const { isSuccess, data, refetch, isLoading } = useContractRead(
    contractArgs,
    'getNftUriOfAccount',
    {
      args: accountAddress,
      enabled: false,
    }
  );

  const nftUri = data as string | undefined;

  useEffect(() => {
    if (!accountAddress) return;
    refetch();
  }, [accountAddress]);

  return { isSuccess, nftUri, isLoading };
};

const useNftMetadata = (nftUri: string | undefined): Metadata | undefined => {
  const retrieveMetadata = async () => {
    const url = `${gatewayBaseUrl}${cleanUri(nftUri)}`;
    const { data } = await axios.get<Metadata>(url);
    return data;
  };

  const { data, refetch } = useQuery(['metadata', nftUri], retrieveMetadata, {
    enabled: false,
  });

  useEffect(() => {
    if (!nftUri) return;
    refetch();
  }, [nftUri, refetch]);

  return useMemo(() => {
    if (!data) return;
    return {
      ...data,
      image: `${gatewayBaseUrl}${cleanUri(data.image)}`,
    };
  }, [data]);
};

const cleanUri = (uri: string | undefined) => uri?.replace('ipfs://', '');

export default DisplayOrRequestNFT;
