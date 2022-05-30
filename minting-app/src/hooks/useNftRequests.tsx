import axios from 'axios';
import { useQuery } from 'react-query';
import { NftRequest } from '../notion/notionClient';

const useNftRequests = () => {
  const fetchNftRequests = async () => {
    const { data } = await axios.get<NftRequest[]>('/api/nftrequests');
    return data;
  };
  const { data } = useQuery(['nftRequests'], fetchNftRequests);
  return data;
};

export default useNftRequests;
