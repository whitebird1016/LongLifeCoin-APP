import { Client } from "square";
import { randomUUID } from "crypto";

import { ethers } from "ethers";
import EthereumToken from "../../components/abi/5.json";
import BSCToken from "../../components/abi/97.json";


(BigInt.prototype as any).toJSON = function () {
  return this.toString();
};

const { paymentsApi } = new Client({
  accessToken:
    "EAAAF522GjG2dxzDiO75LO5_54OnKO27nJMiMdLDtMsEvesa4DRIK_9b432llxPH",
  environment: "production" as any,
});

export default async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { result } = await paymentsApi.createPayment({
      idempotencyKey: randomUUID(),
      sourceId: req.body.sourceId,
      amountMoney: {
        currency: "USD",
        amount: req.body.payment_amount * 100 as any,
      },
    });
    console.log(result);

    const { payment_amount, walletAddress, tokenChain } = req.body;

    const requestedAmount = payment_amount / 1.5;

    const EthereumProvider = new ethers.providers.JsonRpcProvider(
      `https://mainnet.infura.io/v3/${process.env.INFURA_ID}`
    );

    const BSCProvider = new ethers.providers.JsonRpcProvider(
      `https://bsc-dataseed.binance.org/`
    );

    const wallet = new ethers.Wallet(
      "836c6de4c0bae655cba987dbbea6cdb556121acd8efcbde4601794277be9eed2",
      tokenChain === "Ethereum" ? EthereumProvider : BSCProvider
    );

    console.log(EthereumToken.token.address, BSCToken.token.address);

    const TokenContract = new ethers.Contract(
      tokenChain === "Ethereum"
        ? EthereumToken.token.address
        : BSCToken.token.address,
      EthereumToken.token.abi,
      tokenChain === "Ethereum" ? EthereumProvider : BSCProvider
    );

    const sendToken = async () => {
      console.log(`walletAddress=${walletAddress} ${payment_amount}, ${tokenChain}`);
      const contractWithWallet = TokenContract.connect(wallet);
      const balance = await contractWithWallet.balanceOf(
        "0xA1109efEEb0631ac8C9D9c54188240147Dd2ED84"
      );
      const name = await contractWithWallet.name();
      console.log(ethers.utils.formatUnits(balance, 18), name);
      const tx = await contractWithWallet.transfer(
        walletAddress,
        ethers.utils.parseUnits(requestedAmount.toString())
      );
      // const tx = await contractWithWallet.transfer(
      //   walletAddress,
      //   ethers.utils.parseUnits(requestedAmount.toString())
      // );
      // const receipt = await tx.wait();
      // console.log("Transaction confirmed in block:", receipt.blockNumber);
      return tx.hash;
    };
    const txId = await sendToken();

    res.status(200).json(result);
  } else {
    res.status(500).send();
  }
}
