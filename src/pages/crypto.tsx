import { ethers } from "ethers";
import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import handleSwitchNetwork from "@/components/handleSwitchNetwork";
import { WalletConnectContext } from "@/context/walletConnectProvider";

const Crypto = () => {

    const { currentNetwork, handleCurrentNetwork }: any = useContext(WalletConnectContext);

    const [tokenAmount, setTokenAmount] = useState<number>(0);
    const [coinAmount, setCoinAmount] = useState<number>(0);

    const [coinPrice, setCoinPrice] = useState<number>(0);

    const handleCoinChange = (e: any) => {
        let amount = e.target.value;
        setCoinAmount(amount);
        setTokenAmount(amount * coinPrice / 1.5);
    }

    const handleTokenChange = (e: any) => {
        let amount = e.target.value;
        setTokenAmount(amount);
        setCoinAmount(amount / coinPrice * 1.5);
    }



    const buyLLCToken = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const LLCcontract = new ethers.Contract(
                    currentNetwork.address,
                    currentNetwork.abi,
                    signer
                );
                let tx = await LLCcontract.buy(
                    ethers.utils.parseUnits(tokenAmount.toString(), 18),
                    {
                        value: ethers.utils.parseUnits(coinAmount.toString(), 18),
                    }
                );

                tx.wait();
            }
        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        handleSwitchNetwork(currentNetwork);
        const getTokenPrice = async () => {
            try {
                if (window.ethereum) {
                    const provider = new ethers.providers.JsonRpcBatchProvider(
                        currentNetwork.rpcUrls
                    );
                    const LLCcontract = new ethers.Contract(
                        currentNetwork.address,
                        currentNetwork.abi,
                        provider
                    );
                    let price = (await LLCcontract.price()) / 1000000;
                    setCoinPrice(price);
                }
            } catch (err) {
                console.log(err);
            }
        }
        getTokenPrice();
        console.log(`currentNetwork: ${currentNetwork}`)
    }, [currentNetwork])


    return (
        <div className="flex flex-col py-24 items-center justify-center px-12 max-sm:px-6">
            <p className="text-4xl max-sm:text-2xl font-bold text-center">
                Buy LongLifeCoin using Crypto
            </p>
            <div className="flex flex-col justify-center items-center gap-6">
                <p className="text-center pt-4 pb-20 text-xl">
                    LongLifeCoin Finance Stage
                </p>
                <div className="flex justify-center items-center gap-4 max-sm:justify-start">
                    {currentNetwork.id === 1 ? (
                        <Image
                            src={"/assets/img/svg/ethereum.svg"}
                            width={16}
                            height={16}
                            className="w-16 h-16 max-sm:w-12 max-sm:h-12"
                            alt="LongLifeCoin ETH"
                        />
                    ) : (
                        <Image
                            src={"/assets/img/svg/bnb.svg"}
                            width={16}
                            height={16}
                            className="w-16 h-16 max-sm:w-12 max-sm:h-12"
                            alt="LongLifeCoin BNB"
                        />
                    )}
                    <select
                        className="bg-[#060A21] outline-none w-[72px] text-2xl max-sm:text-base"
                        onChange={(e) => handleCurrentNetwork(e.target.value)}
                    >
                        <option value="ETH" className="bg-blue-600 text-right">
                            ETH
                        </option>
                        <option
                            value="BNB"
                            className="bg-blue-600 text-[#fefefe] text-right"
                        >
                            BNB
                        </option>
                    </select>
                    <input
                        type="text"
                        placeholder="0.0"
                        value={coinAmount}
                        className="w-full bg-[#060A21] outline-none border-b-2 border-b-white text-xl px-2"
                        onChange={handleCoinChange}
                    />
                </div>
                <div className="flex justify-center items-center gap-4 max-sm:justify-start">
                    <Image
                        src={"/assets/img/svg/longlifecoin.svg"}
                        width={16}
                        height={16}
                        className="w-16 h-16 max-sm:w-12 max-sm:h-12"
                        alt="LongLifeCoin BNB"
                    />
                    <p className="w-[72px] text-right text-2xl max-sm:text-base">
                        LLC
                    </p>
                    <input
                        type="text"
                        placeholder="0.0"
                        value={tokenAmount}
                        className="w-full bg-[#060A21] outline-none border-b-2 border-b-white text-xl px-2"
                        onChange={handleTokenChange}
                    />
                </div>
                <button
                    type="button"
                    onClick={buyLLCToken}
                    className="bg-blue-500 mt-16 py-2 px-6 w-full text-2xl rounded-full active:bg-blue-400"
                >
                    Buy Token
                </button>
            </div>
        </div>
    )
}

export default Crypto;