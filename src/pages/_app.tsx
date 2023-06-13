import LayoutHeader from "@/components/layoutHeader";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { createClient, WagmiConfig } from "wagmi";
import { connectors, provider } from "../components/wagmi";
import { WalletConnectProvider } from "@/context/walletConnectProvider";
import LayoutFooter from "@/components/layoutFooter";


export default function App({ Component, pageProps }: AppProps) {
  const client = createClient({
    autoConnect: true,
    connectors: connectors,
    provider,
  });
  return (
    <WagmiConfig client={client}>
      <WalletConnectProvider>
        <LayoutHeader />
        <Component {...pageProps} />
        <LayoutFooter />
      </WalletConnectProvider>
    </WagmiConfig>
  );
}