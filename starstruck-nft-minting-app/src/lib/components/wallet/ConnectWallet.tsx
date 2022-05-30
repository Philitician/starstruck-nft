import { Button } from '@chakra-ui/react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

const ConnectWallet = () => {
  const { data } = useAccount()
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  })
  const { disconnect } = useDisconnect()

  return (
    <>
      {data && <Button onClick={() => disconnect()}>Disconnect</Button>}
      {!data && <Button onClick={() => connect()}>Connect Wallet</Button>}
    </>
  )
}

export default ConnectWallet