import { utils } from "ethers";
import EthereumcontractABI from "@/components/abi/5.json";
import BSCcontractABI from "@/components/abi/97.json";

export const NETWORK_DATA = [
  {
    id: 1,
    name: "Ethereum",
    isActive: true,
    chainId: utils.hexValue(1),
    chainNoHex: 1,
    address: EthereumcontractABI.presale.address,
    abi: EthereumcontractABI.presale.abi,
    chainName: "Ethereum Mainnet",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: "https://mainnet.infura.io/v3/ca11249dabe247c1a6e0877c24376dda",
    blockExplorerUrls: ["https://etherscan.io"],
  },
  {
    id: 2,
    name: "BSC",
    isActive: false,
    chainId: utils.hexValue(56),
    chainNoHex: 56,
    address: BSCcontractABI.presale.address,
    abi: BSCcontractABI.presale.abi,
    chainName: "BSC Mainnet",
    nativeCurrency: { name: "BSC", symbol: "BNB", decimals: 18 },
    rpcUrls: "https://bsc-dataseed1.binance.org/",
    blockExplorerUrls: ["https://bscscan.com/"],
  },
];
