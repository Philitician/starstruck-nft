import { useEffect } from 'react';
import { useAccount, useContractRead } from 'wagmi';
import { contractArgs } from '../constants';

const useGetNftIdOfOwner = () => {
  const account = useAccount();
  const accountAddress = account?.data?.address;

  const { isSuccess, data, refetch, isLoading, error } = useContractRead(
    contractArgs,
    'getNftIdOfOwner',
    {
      args: accountAddress,
      enabled: false,
    }
  );

  const id = data as string | undefined;

  useEffect(() => {
    if (!accountAddress) return;
    refetch();
  }, [accountAddress]);

  return { isSuccess, id, isLoading, error };
};

export default useGetNftIdOfOwner;
