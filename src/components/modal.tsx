import { WalletConnectContext } from "@/context/walletConnectProvider";
import { useRef, useContext, useState, useEffect } from "react";

const Modal = (props: any) => {

    const { isConnected }: any = useContext(WalletConnectContext);

    const [flag, setFlag] = useState<boolean>(false)

    const modalRef = useRef<any>(null);

    const handleOutsideClick = (event: any) => {
        if (modalRef.current && !modalRef.current.contains(event.target)) {
            props.onClose();
        }
    };

    useEffect(() => {
        setFlag(isConnected)
    }, [isConnected])

    return (
        <div>
            {props.open && !flag && < div className="fixed top-0 left-0 bg-[#00000050] w-full h-full" onClick={handleOutsideClick} >
                <div className="max-sm:w-[90%] fixed bg-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-xl shadow-xl" ref={modalRef}>
                    <span className="text-black text-4xl font-bold float-right px-2" onClick={props.onClose}>&times;</span>
                    {props.children}
                </div>
            </div >}
        </div>
    );
}

export default Modal;
