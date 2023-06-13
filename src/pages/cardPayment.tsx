import { useState, useEffect, useContext } from "react";
import { PaymentForm, CreditCard } from 'react-square-web-payments-sdk';
import { WalletConnectContext } from "@/context/walletConnectProvider";


const CardPayment = () => {
    const { address }: any = useContext(WalletConnectContext);
    const walletAddress = address ?? "";

    const [cardAmount, setCardAmount] = useState<number>(0);
    const [tokenAmount, setTokenAmount] = useState<number>(0);

    const [tokenChain, setTokenChain] = useState<string>("Ethereum");

    const handleTokenChange = (e: any) => {
        setTokenAmount(e.target.value);
        setCardAmount(e.target.value * 1.5);
    }

    const handleCardChange = (e: any) => {
        setCardAmount(e.target.value);
        setTokenAmount(e.target.value / 1.5);
    }


    return (
        <div className="flex flex-col py-24 items-center justify-center px-12 max-sm:px-6">
            <p className="text-4xl max-sm:text-2xl font-bold text-center pb-20">
                Buy LongLifeCoin using Card
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
                    <p className="w-full">Card Amount</p>
                    <input
                        type="text"
                        placeholder=""
                        className="w-full bg-[#060A21] px-2 outline-none border-b-white border-b-2"
                        value={cardAmount}
                        onChange={handleCardChange}
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
                <PaymentForm
                    applicationId="sq0idp-sxBSrauDP20vdRc-8dIZLQ"
                    cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                        const response = await fetch("/api/payment", {
                            method: "POST",
                            headers: {
                                "Content-type": "application/json",
                            },
                            body: JSON.stringify({
                                sourceId: token.token,
                                payment_amount: cardAmount,
                                walletAddress: walletAddress,
                                tokenChain: tokenChain
                            }),
                        });
                        console.log(await response.json());
                    }}
                    locationId='L2TW24NAV6J6Q'
                >
                    <CreditCard />
                </PaymentForm>
            </div>
        </div>
    )
}

export default CardPayment;