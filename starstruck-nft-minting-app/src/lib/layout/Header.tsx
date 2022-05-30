import { Box, Flex, Heading } from "@chakra-ui/react";
import ConnectWallet from "lib/components/wallet/ConnectWallet";
import Link from "next/link";


const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <Heading as="h1" size="md">
        <Link href="/">Starstruck NFT</Link>
      </Heading>

      <Box marginLeft="auto">
        <ConnectWallet />
      </Box>
    </Flex>
  );
};

export default Header;
