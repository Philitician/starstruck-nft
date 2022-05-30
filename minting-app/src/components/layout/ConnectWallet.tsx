import { Button } from '@mui/material';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';

const ConnectWallet = () => {
  const { isConnected, connect, disconnect } = useConnectWallet();
  return (
    <>
      {isConnected ? (
        <Button color='primary' variant='contained' onClick={() => disconnect()}>
          Disconnect
        </Button>
      ) : (
        <Button color='secondary' variant='outlined' onClick={() => connect()}>
          Connect
        </Button>
      )}
    </>
  );
};

const useConnectWallet = () => {
  const { data } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect();
  return {
    isConnected: data ? true : false,
    connect,
    disconnect,
  };
};

export default ConnectWallet;
