import axios from 'axios';
import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { atom } from 'recoil';
import { useContractWrite } from 'wagmi';
import { contractArgs } from '../constants';

const useMintNft = () => {
  const { mutate } = useCheckRequestedNftAsMinted();
  const request = useRef<string>();
  const { write } = useContractWrite(contractArgs, 'mintTo', {
    onSettled: () => {
      if (!request.current) return;
      console.log('requestId', request.current);
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

const selectedNotionRequestState = atom({
  key: 'selectedNotionRequest',
  default: '',
});

export default useMintNft;
