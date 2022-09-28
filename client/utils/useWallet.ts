import { useCallback, useEffect, useState } from "react";
import { BaseProvider } from "@metamask/providers";
import { BigNumber, ethers } from "ethers";
import CONTRACT_ABI from "../abi/Emitter.json";

// emitのページ用
export const useWallet = () => {
  const [ethereum, setEthereum] = useState<BaseProvider>();
  const [currentAccount, setCurrentAccount] = useState("");
  const CONTRACT_ADDRESS = "0x8481B678362365DC86b227c1207b6070261f8573";

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

  const getSmartContract = useCallback(() => {
    if (!ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const emitterContract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI.abi,
      signer
    );

    return emitterContract;
  }, [ethereum]);

  const remittance = async (address: string, amount: string) => {
    console.log("address", address);
    console.log("amount", amount);
    if (!ethereum) return alert("Get MetaMask!");

    const EmitterContract = getSmartContract();
    const parsedAmount = ethers.utils.parseEther(amount);
    const transactionParams = {
      gas: "0x2710",
      to: address,
      from: currentAccount,
      value: parsedAmount._hex,
    };

    const txHash = await ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParams],
    });

    if (!EmitterContract) return;
    const transactionHash = await EmitterContract.addList(
      address,
      parsedAmount
    );
    await transactionHash.wait();
    console.log("送金成功");
  };

  useEffect(() => {
    const { ethereum } = window;
    setEthereum(ethereum);
  }, []);

  // eventの監視
  useEffect(() => {
    const onAdd = (from: string, reciever: string, amount: BigNumber) => {
      console.log("===== EVENT =====");
      console.log("from:", from);
      console.log("reciver:", reciever);
      console.log("amount:", amount.toNumber());
    };

    const EmitterContract = getSmartContract();
    EmitterContract?.on("add", onAdd);

    return () => {
      EmitterContract?.off("add", onAdd);
    };
  }, [getSmartContract]);

  return {
    currentAccount,
    checkIfWalletIsConnected,
    connectWallet,
    remittance,
  };
};
