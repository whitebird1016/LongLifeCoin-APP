import { WalletConnectContext } from "@/context/walletConnectProvider";
import { useContext, useEffect } from "react";
// import handleSwitchNetwork from "@/components/handleSwitchNetwork";
import Link from 'next/link'
import Image from "next/image";

const Container = () => {

    const { connectors, connect, logout, currentNetwork }: any = useContext(WalletConnectContext);

    // useEffect(() => {
    //     handleSwitchNetwork(currentNetwork);
    // }, [currentNetwork])

    return (
        <div className="text-bold px-12 max-px:6 py-12">
            {
                connectors.map((connector: any, index: any) => {
                    return (
                        <button
                            key={index}
                            onClick={() => connect({ connector })}
                            className="bg-white shadow-xl border rounded-lg my-3 cursor-pointer border-gray-300 w-full text-black px-6 py-2 hover:bg-gray-200 flex gap-8  items-center"
                        >
                            <Image src={`/assets/img/svg/${index + 1}.svg`} width={36} height={36} alt="" />
                            <span>{connector.name}</span>
                        </button>
                    )
                }
                )
            }
            {/* <select className="bg-black rounded-xl py-2 px-4 outline-none" onChange={(e) => handleCurrentNetwork(e.target.value)}>
                <option>ETH</option>
                <option>BNB</option>
            </select> */}
            {/* <button onClick={logout} className="border-2 rounded-lg my-6 cursor-pointer border-gray-300 w-full text-black px-2 py-2 hover:bg-gray-200">Log Out</button> */}
        </div>

    )
}

export default Container;