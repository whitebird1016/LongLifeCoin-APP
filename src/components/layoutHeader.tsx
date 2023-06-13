import { useState, useEffect, useContext } from "react";

import Link from "next/link";
import Image from "next/image";

import Modal from "./modal";
import Container from "@/components/modalContent";
import { WalletConnectContext } from "@/context/walletConnectProvider";

const LayoutHeader = () => {

    const { isConnected, address, logout }: any = useContext(WalletConnectContext);

    const [btnText, setBtnText] = useState<string>("Connect");

    const [showModal, setShowModal] = useState(false);

    const [showMenu, setShowMenu] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        setBtnText(isConnected ? "DisConnect" : "Connect")
        if (isConnected) {
            handleCloseModal();
        }
    }, [isConnected])

    return (
        <div>
            <div className="relative px-12 max-sm:px-6 py-6 flex items-center justify-between font-black text-xl gap-4">
                <div className="flex-[1_1_25%] flex items-center gap-4">
                    <Image src={"/assets/img/svg/longlifecoin.svg"} width={72} height={72} className="max-sm:w-12 max-sm:h-12" alt="" />
                    <h1 className="text-3xl font-bold max-sm:text-2xl">LongLifeCoin</h1>
                </div>
                <div className="flex-[1_1_75%]  justify-end gap-4 flex">
                    <div className="flex gap-8 border rounded-full px-4 py-2.5 max-xl:hidden">
                        <Link href="/">Crypto</Link>
                        <Link href="/paypal">PayPal</Link>
                        <Link href="/cardPayment">Card</Link>
                        <Link href="/chatGPT">ChatGPT</Link>
                    </div>
                    <div className="flex border rounded-full px-4 py-2.5 hidden max-xl:block active:translate-y-1" onClick={() => setShowMenu(!showMenu)} >
                        Menu
                    </div>
                    <div className="flex gap-2 items-center max-lg:hidden">
                        <Link
                            href="/assets/pdf/whitepaper.pdf"
                            rel="noreferrer"
                            target="_blank"
                            className="text-2xl rounded-3xl uppercase bg-red-700 hover:bg-red-400 w-full px-6 py-2 font-bold"
                        >
                            Whitepaper
                        </Link>

                        <button className=" text-2xl rounded-3xl  bg-blue-700 hover:bg-blue-400 w-full px-6 py-2 font-bold" onClick={isConnected ? logout : handleShowModal}>{btnText}</button>

                        <Modal open={showModal} onClose={handleCloseModal}>
                            <Container />
                        </Modal>
                    </div>
                </div>
            </div>
            {showMenu && <div className="flex flex-col gap-2 px-12">
                <div className="flex max-sm:flex-col gap-8 max-sm:gap-2 border-b font-bold px-4 py-2.5">
                    <Link onClick={() => setShowMenu(false)} className="text-xl" href="/">Crypto</Link>
                    <Link onClick={() => setShowMenu(false)} className="text-xl" href="/paypal">PayPal</Link>
                    <Link onClick={() => setShowMenu(false)} className="text-xl" href="/stripe">Credit Card</Link>
                    <Link onClick={() => setShowMenu(false)} className="text-xl" href="/chatGPT">ChatGPT</Link>
                </div>
                <div className="hidden max-lg:flex gap-2 items-center max-sm:flex-col">
                    <Link
                        href="/assets/pdf/whitepaper.pdf"
                        rel="noreferrer"
                        target="_blank"
                        className="text-2xl text-center rounded-3xl uppercase bg-red-700 hover:bg-red-400 w-full px-6 py-2 font-bold"
                    >
                        Whitepaper
                    </Link>
                    <button className=" text-2xl rounded-3xl  bg-blue-700 hover:bg-blue-400 w-full px-6 py-2 font-bold" onClick={isConnected ? logout : handleShowModal}>{btnText}</button>
                    <Modal open={showModal} onClose={handleCloseModal}>
                        <Container />
                    </Modal>
                </div>
            </div>}

        </div>
    )
}

export default LayoutHeader;