const handleSwitchNetwork = async (currentNetwork: any) => {
    const { chainId, chainName, rpcUrls } = currentNetwork;
    try {
        await window.ethereum?.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId }],
        });
    } catch (err: any) {
        console.log(err);
        if (err.code === 4902) {
            try {
                await window.ethereum?.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            chainId,
                            chainName,
                            rpcUrls,
                        },
                    ],
                });
            } catch (addError) {
                return null;
            }
        }
    }
    return null;
};

export default handleSwitchNetwork;
