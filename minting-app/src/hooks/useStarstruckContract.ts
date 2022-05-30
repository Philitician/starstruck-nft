import { useContract, useProvider, useSigner } from 'wagmi';
import { contractArgs } from '../constants';

const useStarstruckContract = () => {
  const signer = useSigner();
  const provider = useProvider();

  const contract = useContract({
    ...contractArgs,
    signerOrProvider: signer.data || provider,
  });

  const isOwner = async (): Promise<boolean | undefined> => {
    const isOwner = await contract.isOwner();
    return isOwner;
  };

  const mintTo = async (receiver: string): Promise<void> => {
    const tx = await contract.mintTo(receiver);
    await tx.wait();
  };

  return {
    contract,
    chainId: contract.provider.network?.chainId,
    isOwner,
    mintTo,
  };
};

export default useStarstruckContract;
