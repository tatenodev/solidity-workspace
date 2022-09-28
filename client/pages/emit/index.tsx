import { NextPage } from "next";
import { useEffect } from "react";
import { useWallet } from "../../utils/useWallet";

const Emit: NextPage = () => {
  const { currentAccount, checkIfWalletIsConnected, connectWallet } =
    useWallet();

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
        <input type="text" placeholder="Address" id="address" name="address" />
      </div>
      <div>
        <label htmlFor="amount">Amount: </label>
        <input type="text" placeholder="Amount" id="amount" name="amount" />
      </div>
    </div>
  );
};

export default Emit;
