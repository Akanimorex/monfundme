"use client"

import { waitForTransactionReceipt, writeContract } from "wagmi/actions";
import monfund_ABI from "@/web3/abi/monfund_ABI";
import { config } from "@/web3/config";
import { toast } from "react-toastify";
const Withdraw = ({ id }: { id: string }) => {

    const withdrawAndClose = async (id: string) => {

        const writeWithdraw = new Promise(async (resolve, reject) => {

            try {
                const tx = await writeContract(config, {
                    address: id as `0x${string}`,
                    abi: monfund_ABI,
                    functionName: "withdraw",
                })

                await waitForTransactionReceipt(config, { hash: tx })
                resolve(tx)
            } catch (error) {
                reject(error)
            }
        })

        toast.promise(writeWithdraw, {
            pending: "Withdrawing...",
            success: "Withdrawn",
            error: "Error withdrawing"
        })
    }

    return <div className="flex justify-center">
        <button onClick={() => {
            withdrawAndClose(id)
        }} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-all duration-300">
            Withdraw and Close
        </button>
    </div>;
};

export default Withdraw;