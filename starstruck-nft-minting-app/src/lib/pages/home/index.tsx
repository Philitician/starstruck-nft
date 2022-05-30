import { Box, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { contractAddress } from "utils/constants";
import { useAccount, useContract, useProvider } from "wagmi";
import abi from "../../../abi/starstruckNFT.json";

const Home = () => {
  return (
    <Box
      display={{ md: "flex" }}
      alignItems="center"
      minHeight="70vh"
      gap={8}
      mb={8}
      w="full"
    >
      <Box>
        <DisplayNFT />
      </Box>
    </Box>
  );
};

const DisplayNFT = () => {
  const { data: isConnected } = useAccount();
  const [ nftUri, setNftUri ] = useState<string>();
  const provider = useProvider();
  useEffect(() => {
    console.log('provider', provider)
  }, [provider])

  const contract = useContract(
    {
      addressOrName: contractAddress,
      contractInterface: abi,
    },
  )
  
  const getMyNftUri = async () => {
    console.log('getting my nft uri');
    const nftUri = await contract.getMyNftUri();
    console.log(nftUri);
    setNftUri(nftUri);
  }

  useEffect(() => {
    console.log('data', isConnected)
    console.log('contract', contract)
    if (!contract || !isConnected) return;
    getMyNftUri();
  }, [contract, isConnected]);
  
  return (
    <Box
      display={{ md: "flex" }}
      alignItems="center"
      minHeight="70vh"
      gap={8}
      mb={8}
      w="full"
    >
      <Box>
        <Button onClick={() =>{}}>Get NFTs</Button>
      </Box>
    </Box>
  );
};

export default Home;
