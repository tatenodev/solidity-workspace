import { useCallback, useEffect, useState } from "react";
import { BaseProvider } from "@metamask/providers";

export const useWallet = () => {
  const [ethereum, setEthereum] = useState<BaseProvider>();
  const [currentAccount, setCurrentAccount] = useState("");

  const checkIfWalletIsConnected = useCallback(async () => {
    if (!ethereum) return;
    const accounts = (await ethereum.request({
      method: "eth_accounts",
    })) as Array<any>;
    if (accounts.length === 0) return;
    setCurrentAccount(accounts[0]);
  }, [ethereum]);

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("Get MetaMask!");
      const accounts = (await ethereum.request({
        method: "eth_requestAccounts",
      })) as Array<any>;
      accounts && setCurrentAccount(accounts[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const remittance = async () => {
    if (!ethereum) return alert("Get MetaMask!");
  };

  useEffect(() => {
    const { ethereum } = window;
    setEthereum(ethereum);
  }, []);

  return {
    currentAccount,
    checkIfWalletIsConnected,
    connectWallet,
  };
};
