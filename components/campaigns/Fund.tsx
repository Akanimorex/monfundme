"use client";
import { useState } from "react";
import { useCheckChain, useWrite } from "@/utils/hooks";
import { formatEther, parseEther } from "viem";
import { Modal } from "../general";
import { useAccount, useBalance } from "wagmi";
import { config } from "@/web3/config";
import { toast } from "react-toastify";
import Image from "next/image";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import monfund_ABI from "@/web3/abi/monfund_ABI";

const Fund = ({ id, refetch }: { id: string; refetch: () => void }) => {
	const [amount, setAmount] = useState<string>("");
	const [toggle, setToggle] = useState<boolean>(false);
	const { isPending, _status } = useWrite();
	const { checkAndSwitch } = useCheckChain();
	const { isConnected, address } = useAccount();
	const { openConnectModal } = useConnectModal();

	const { data: bal } = useBalance({ address: address, config: config });

	const Mon_bal = bal
		? ` ${Number(formatEther(bal?.value)).toFixed(2)} DMON`
		: " -- ";

	if (_status == "success") {
		refetch();
	}

	const handleDonate = async () => {
		if (!amount) {
			toast.error("Input an amount", {
				autoClose: 2000,
			});
			return;
		}

		await checkAndSwitch();

		if (parseEther(amount) > (bal?.value as bigint)) {
			toast.error("Insufficient DMON", {
				autoClose: 2000,
			});
			return;
		}

		const donate = new Promise(async (resolve, reject) => {
			try {
				const tx = await writeContract(config, {
					abi: monfund_ABI,
					address: id as `0x${string}`,
					functionName: "donateWithMON",
					value: parseEther(amount),
				});

				const { status } = await waitForTransactionReceipt(config, {
					hash: tx,
				});

				if (status == "success") {
					setToggle(true);
					resolve("Campaign funded");
				} else {
					reject("Error funding campaign");
				}

			} catch (error: any) {
				reject(error?.shortMessage || error?.message);
			}
		});
		toast.promise(donate, {
			pending: "Funding campaign ... ",
			success: {
				render() {
					return "Campaign funded";
				},
			},
			error: "Error funding campaign",
		});


	};

	return (
		<>
			{toggle && (
				<Modal setToggle={setToggle}>
					<Image
						src={"/thankYou.gif"}
						alt="thank you"
						fill
						unoptimized
						priority
						className="rounded-lg"
					/>
				</Modal>
			)}

			{isConnected ? (

				<div className="mb-5 flex flex-col ">
					<div className="">
						<div className=" bg-slate-100 grid grid-cols-[50%_50%]  ">
							<input
								type="number"
								placeholder="MON 0.1"
								step="0.01"
								className="  w-full py-[10px] bg-transparent sm:px-[20px] px-[5px] outline-none text-black text-[18px] leading-[30px] placeholder:text-black/50 rounded-[10px]"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
							/>
							<p className="bg-accent-default text-white font-semibold grid place-content-center cursor-default ">
								{Mon_bal}
							</p>
						</div>

						<button
							type="button"
							disabled={isPending ? true : false}
							className={` disabled:bg-white font-epilogue font-semibold text-[16px] leading-[26px] shadow-md text-white  min-h-[52px] px-4 rounded-[10px] accent_with_fade mt-5 hover:bg-accent-dark `}
							onClick={!isPending ? handleDonate : () => null}>
							Fund campaign
						</button>
					</div>
				</div>
			) : (
				<button onClick={openConnectModal} className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium mb-4">
					Connect wallet to fund
				</button>
			)}
		</>
	);
};

export default Fund;
