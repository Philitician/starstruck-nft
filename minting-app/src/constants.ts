import StarstruckNFT from './abi/StarstruckNFT.json';

export const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS ?? '';

export const contractArgs = {
  addressOrName: contractAddress,
  contractInterface: StarstruckNFT,
};

export const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;
export const alchemyUrl = `${process.env.NEXT_PUBLIC_ALCHEMY_BASE_URL}${alchemyId}`;

export const gatewayBaseUrl = process.env.NEXT_PUBLIC_GATEWAY_BASE_URL;
