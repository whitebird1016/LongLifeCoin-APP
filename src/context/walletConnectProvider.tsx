import { useNetwork, useAccount, useConnect, useDisconnect } from "wagmi";
import { useState, useEffect, createContext } from "react";

import { NETWORK_DATA } from "../utils/const_utils";

const WalletConnectContext = createContext({});


const WalletConnectProvider = (props: any) => {

    const { address, connector, isConnected } = useAccount()

    const [currentNetwork, setCurrentNetwork] = useState(NETWORK_DATA[0]);

    const { disconnect } = useDisconnect();

    const { connectors, connect } = useConnect({
        onSuccess() {
            console.log("success");
        },
    });


    const logout = () => {
        disconnect();
    };

    const handleCurrentNetwork = (chain: any) => {
        setCurrentNetwork(chain === "ETH" ? NETWORK_DATA[0] : NETWORK_DATA[1])
    }


    return (
        <WalletConnectContext.Provider value={{ connectors, connect, isConnected, address,  currentNetwork, handleCurrentNetwork, logout }}>
            {props.children}
        </WalletConnectContext.Provider>
    );
}

export { WalletConnectContext, WalletConnectProvider };