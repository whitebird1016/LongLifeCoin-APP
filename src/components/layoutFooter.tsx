import Image from "next/image";

const LayoutFooter = () => {
    return (
        <div>
            {/* <div className="bg-gradient-to-r from-[#310056] to-[#5f5fa7] py-6">
                <div className="container mx-auto flex px-12 max-sm:px-6 max-lg:flex-col gap-8">
                    <div className="flex-[1_1_50%] flex flex-col gap-4 justify-center max-lg:items-center">
                        <p className="max-md:text-center text-[#ffec37] text-xl font-bold">
                            What are you waiting for?
                        </p>
                        <p className="max-md:text-center text-2xl font-bold pb-2">
                            Become an LLC Token Holder!
                        </p>
                        <button className="rounded-full bg-blue-600 px-4 py-2 font-bold text-xl w-60 max-sm:w-full">
                            Join Now
                        </button>
                    </div>
                    <div className="flex-[1_1_50%] flex items-center justify-center">
                        <Image
                            src={"/assets/img/svg/jumping-boy.svg"}
                            width={240}
                            height={240}
                            alt="longlifecoin-win"
                        />
                    </div>
                </div>
            </div> */}
            <div className="max-sm:px-6 px-24 py-6 bg-[#14173c] flex flex-col justify-center items-center gap-2">
                <p className="text-xl max-sm:text-xl font-bold text-center">
                    Exchange your Crypto for LongLifeCoin
                </p>
                <p className="text-xl max-sm:text-xl font-bold text-center">
                    Above Information is not guaranteed. And subject to change without
                    notice.
                </p>
                <div className="flex">
                    <a href="https://facebook.com" className="px-4" rel="noreferrer" target="_blank">
                        <Image
                            src={"/assets/img/svg/facebook.svg"}
                            width={36}
                            height={36}
                            alt="longlifecoin-facebook"
                        />
                    </a>
                    <a href="https://linkedin.com" className="px-4" rel="noreferrer" target="_blank">
                        <Image
                            src={"/assets/img/svg/linkedin.svg"}
                            width={36}
                            height={36}
                            alt="longlifecoin-linkedin"
                        />
                    </a>
                    <a href="https://twitter.com" className="px-4" rel="noreferrer" target="_blank">
                        <Image
                            src={"/assets/img/svg/twitter.svg"}
                            width={36}
                            height={36}
                            alt="longlifecoin-twitter"
                        />
                    </a>

                </div>
                <hr className="w-full" />
                <p className="text-sm max-sm:text-sm">
                    ©2022 LongLife Coin - Cryptocurrency ICO System
                </p>
            </div>
        </div>
    );
};

export default LayoutFooter;
