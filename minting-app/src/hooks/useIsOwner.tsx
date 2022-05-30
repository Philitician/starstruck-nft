import { useEffect, useMemo } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { contractArgs } from '../constants';

const useIsOwner = () => {
  const account = useAccount();
  const walletAddress = account?.data?.address;

  const { isSuccess, data, refetch, isLoading } = useContractRead(contractArgs, 'owner', {
    enabled: false,
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

export default useIsOwner;
