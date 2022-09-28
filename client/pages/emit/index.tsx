import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useWallet } from "../../utils/useWallet";

const Emit: NextPage = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");
  const { currentAccount, checkIfWalletIsConnected, connectWallet } =
    useWallet();

  const handleSubmit = () => {
    if (!address || amount) return;
  };

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  return (
    <div>
      {currentAccount ? (
        "Wallet接続済み"
      ) : (
        <button type="button" onClick={connectWallet}>
          ウォレット連携
        </button>
      )}

      <div>
        <label htmlFor="address">Address: </label>
        <input
          type="text"
          placeholder="Address"
          id="address"
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount: </label>
        <input
          type="text"
          placeholder="Amount"
          id="amount"
          name="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <button type="button">送金</button>
      </div>
    </div>
  );
};

export default Emit;
