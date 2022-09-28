import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useWallet } from "../../hooks/useWallet";

const Emit: NextPage = () => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("0");
  const {
    currentAccount,
    checkIfWalletIsConnected,
    connectWallet,
    remittance,
  } = useWallet();

  const handleSubmit = () => {
    if (!address || !amount) return;
    remittance(address, amount);
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
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="amount">Amount: </label>
        <input
          type="number"
          step="0.0001"
          placeholder="Amount"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div>
        <button type="button" onClick={handleSubmit}>
          送金
        </button>
      </div>
    </div>
  );
};

export default Emit;
