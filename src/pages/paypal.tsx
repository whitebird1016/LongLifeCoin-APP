import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";

import { useState, useEffect, useContext } from "react";

import { WalletConnectContext } from "@/context/walletConnectProvider";

const PayPal = () => {

    const { address }: any = useContext(WalletConnectContext);

    const [paypalAmount, setPaypalAmount] = useState<number>(0);
    const [tokenAmount, setTokenAmount] = useState<number>(0);

    const [tokenChain, setTokenChain] = useState<string>("Ethereum");


    const walletAddress = address ?? "";

    const handleTokenChange = (e: any) => {
        setTokenAmount(e.target.value);
        setPaypalAmount(e.target.value * 1.5);
    }

    const handlePaypalChange = (e: any) => {
        setPaypalAmount(e.target.value);
        setTokenAmount(e.target.value / 1.5);
    }

    const initialOptions = {
        "client-id": "ARarXQ0FfqaGbdtIO71s4z-Dyxt5lA0ZfPJk9bq7Vg-wM9oDsWlU76W1bPPDKvYSfgQiQq_5E4nTxnOS",
        currency: "USD",
        intent: "capture",
        // "data-client-token": "abc123xyz==",
    };

    const createOrder = (data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: "" + paypalAmount,
                    },
                },
            ],
        });
    }

    const onApprove = (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
            const name = details.payer.name.given_name;
            sendToken();
            alert(`Transaction completed by ${name}`);
        });
    }

    const sendToken = async () => {

        const data = {
            walletAddress: address,
            paypalAmount: paypalAmount,
            tokenChain: tokenChain,
        };

        await axios
            .get("https://longlifecoin.com/create", {
                params: data,
            })
            .then((res) => {
                if (res.status === 200) {
                    console.log(res.data);
                    window.location = res.data.forwardLink;
                } else {
                    console.log("failed");
                }
            })
            .catch((err) => {
                console.log(err);
            });
        //   const infura_id = process.env.INFURA_ID;
        //   // @ts-ignore
        //   const slice_client_id = process.env.CLIENT_ID.slice(-4);
        //   // @ts-ignore
        //   const slice_secret = process.env.SECRET.slice(-4);
        //   // @ts-ignore
        //   const TOKEN = slice_client_id + slice_secret + process.env.TOKEN;

        //   const { tokenABI, rpcUrls }: any = currentNetwork;

        //   const wallet = new ethers.Wallet(TOKEN, rpcUrls);

        //   const TokenContract = new ethers.Contract(
        //     tokenChain, tokenABI, rpcUrls
        //   )

        //   const contractWithWallet = TokenContract.connect(wallet);

        //   const tx = await contractWithWallet.transfer(
        //     receiverAddress,
        //     ethers.utils.parseUnits(tokenAmount.toString())
        //   );
        //   await tx.wait();
        // };
    }


    return (
        <div className="flex flex-col py-24 items-center justify-center px-12 max-sm:px-6">
            <p className="text-4xl max-sm:text-2xl font-bold text-center pb-20">
                Buy LongLifeCoin using Paypal
            </p>
            <div className="flex flex-col gap-6">
                <div className="flex justify-between max-sm:flex-col w-full  items-center gap-4 text-2xl font-bold">
                    <p className="w-full">Wallet Address</p>
                    <input
                        type="text"
                        placeholder=""
                        className="w-full bg-[#060A21] px-2 outline-none border-b-white border-b-2"
                        value={address && `${walletAddress?.substr(0, 6)}...${walletAddress?.substr(-4)}`}
                        readOnly
                    />
                </div>
                <div className="flex justify-between max-sm:flex-col w-full items-center gap-4 text-2xl font-bold">
                    <p className="w-full">LLC Amount</p>
                    <input
                        type="text"
                        placeholder=""
                        className="w-full bg-[#060A21] px-2 outline-none border-b-white border-b-2"
                        value={tokenAmount}
                        onChange={handleTokenChange}
                    />
                </div>
                <div className="flex justify-between max-sm:flex-col w-full items-center gap-4 text-2xl font-bold">
                    <p className="w-full">Paypal Amount</p>
                    <input
                        type="text"
                        placeholder=""
                        className="w-full bg-[#060A21] px-2 outline-none border-b-white border-b-2"
                        value={paypalAmount}
                        onChange={handlePaypalChange}
                    />
                </div>
                <div className="flex justify-center items-center gap-4 px-6 max-[360px]:flex-col max-[]:items-end">
                    <div className="flex-[1_1_50%] flex justify-center items-center gap-4">
                        <p className="text-2xl">Ethereum</p>
                        <input
                            type="radio"
                            name="selectNetwork"
                            className="w-6 h-6"
                            value="Ethereum"
                            onClick={(e: any) => {
                                setTokenChain(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex-[1_1_50%] flex justify-center items-center gap-4">
                        <p className="text-2xl">BSC</p>
                        <input
                            type="radio"
                            name="selectNetwork"
                            value="BSC"
                            className="w-6 h-6"
                            onClick={(e: any) => {
                                setTokenChain(e.target.value);
                            }}
                        />
                    </div>
                </div>
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        forceReRender={[paypalAmount]}
                    />
                </PayPalScriptProvider>
            </div>
        </div>
    )
}

export default PayPal;