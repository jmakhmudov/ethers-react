import { useState } from 'react';
import { ethers } from 'ethers';
import './App.css';


function App() {
  const [walletAddress, setWalletAddress] = useState<string>('');

  const handleCopy = (): void => {
    navigator.clipboard.writeText(walletAddress);
  };

  const modifyWalletAddress = (address: string): JSX.Element => {
    let firstSix = address.slice(0, 6);
    let lastFour = address.slice(-4);

    return <p>Wallet address: <span onClick={handleCopy} className='data address' >{`${firstSix}....${lastFour}`}</span></p>;
  }

  const requestWallet = async () => {
    if (window.ethereum) {

      try {
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        setWalletAddress(accounts[0])
      } catch (error) {
        console.log("Error:", error)
      }

    } else {
      console.log("metamask is not found")
    }
  }

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      await requestWallet();

      const provider = new ethers.BrowserProvider(window.ethereum);
      console.log(provider);

    }
  }

  return (
    <main>
      <h1>Ethers.js and React Integration</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      {
        walletAddress ?
          modifyWalletAddress(walletAddress)
          :
          <div></div>
      }
    </main>
  )
}

export default App
