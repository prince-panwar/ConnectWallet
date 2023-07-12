"use client"
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

function ConnectMetaMask() {
  const [provider, setProvider] = useState(null);
  const [connected, setConnected] = useState(false);
  const [balance, setBalance] = useState('');
  const [currentaccount, setCurrentAccount] = useState('');
  useEffect(() => {
    async function getProvider() {
      const ethereumProvider = await detectEthereumProvider();
      if (ethereumProvider) {
        setProvider(new ethers.providers.Web3Provider(ethereumProvider));
      } else {
        console.log('MetaMask not detected');
      }
    }

    getProvider();
  }, []);

  const connectWallet = async () => {
    try {
   const account=   await provider.send('eth_requestAccounts', []);
      setConnected(true);

      //set the account
      setCurrentAccount(account[0]);
      //call getBalance
    getAccountBalance(currentaccount)
    } catch (err) {
      console.error(err);
    }
  };
  const getAccountBalance= async(account)=>{
  try{
    const balance= await provider.send('eth_getBalance', [account,'latest']);
    setBalance(ethers.utils.formatEther(balance));
  }catch (err){
    console.error(err);
  }
  }


  const disconnectWallet = async () => {
    try {
      await provider.send('eth_requestAccounts', []);
      setConnected(false);
      setAccount('');
      setBalance('');
      console.log('Disconnected from MetaMask');
      // Perform any necessary cleanup or additional actions upon disconnection
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh"}}>
      <div style={{ textAlign: "center" }} >
      <p>Connection Status: {connected ? 'Connected' : 'Disconnected'}</p>
      {connected ? (
        <>
         <p>Account: {currentaccount}</p>
         <p>Balance: {balance} ETH</p>
        <button onClick={disconnectWallet}>Disconnect from MetaMask</button>
        </>
      ) : (
        <button onClick={connectWallet}>Connect to MetaMask</button>
      )}
      </div>
    </div>
  );
}

export default ConnectMetaMask;
