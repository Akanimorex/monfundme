"use client";
import { useState, useEffect, useMemo } from "react";
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
import {
  useAuthModal,
  useUser,
  useSmartAccountClient,
  useSendUserOperation,
  useWaitForUserOperationTransaction,
} from "@account-kit/react";
import { encodeFunctionData } from "viem";
import { resolve } from "path";

const Fund = ({ id, refetch }: { id: string; refetch: () => void }) => {
  const [amount, setAmount] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  const { isPending, _status } = useWrite();
  const { checkAndSwitch } = useCheckChain();
  const { isConnected, address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const user = useUser();
  const { client } = useSmartAccountClient({});
  const [txHash, setTxHash] = useState<string | null>(null);
  
  // Add the transaction tracking hook
  const { 
    waitForUserOperationTransaction,
    isWaitingForUserOperationTransaction,
    waitForUserOperationTransactionResult
  } = useWaitForUserOperationTransaction({
    client,
    onSuccess: (result) => {
      console.log("Transaction confirmed:", result);
      toast.success("Transaction confirmed successfully");
      setToggle(true);
      refetch();
    },
    onError: (error) => {
      console.error("Transaction failed:", error);
      toast.error(error.message);
    }
  });
  
  // Effect to track transaction when hash is available
  useEffect(() => {
    if (txHash && client) {
      waitForUserOperationTransaction({ hash: txHash as `0x${string}` });
    }
  }, [txHash, client, waitForUserOperationTransaction]);
  
  const { sendUserOperation, isSendingUserOperation, sendUserOperationAsync } = useSendUserOperation({
    client,
    // optional parameter that will wait for the transaction to be mined before returning
    onSuccess: ({ hash, request }) => {
      // [optional] Do something with the hash and request
      console.log(hash, "hash");
      setTxHash(hash);
      toast.info("Transaction submitted, waiting for confirmation...");
      // We'll let the tracking hook handle the success notification
    },
    onError: (error) => {
      // [optional] Do something with the error
      console.log(error, "error");
      toast.error("Transaction failed");
    },
  });
  
  const { openAuthModal } = useAuthModal();

  const [smartBalance, setSmartBalance] = useState<bigint | null>(null);

  const { data: bal } = useBalance({ address: address, config: config });

  useEffect(() => {
    const fetchBalance = async () => {
      if (client && user) {
        try {
          const bal = await client?.getBalance({
            address: client.account.address,
          });
          setSmartBalance(bal);
        } catch (err) {
          console.error("Failed to fetch smart account balance", err);
        }
      }
    };
    fetchBalance();
  }, [client, user]);

  const balanceToUse = useMemo(() => {
    if (user && client && smartBalance !== null) return smartBalance;
    if (bal?.value) return bal.value;
    return null;
  }, [bal, smartBalance, user, client]);

  const Mon_bal = balanceToUse
    ? `${Number(formatEther(balanceToUse)).toFixed(2)} DMON`
    : "--";

  if (_status == "success") {
    refetch();
  }

  const handleDonate = async () => {
    if (!amount) {
      toast.error("Input an amount");
      return;
    }

    await checkAndSwitch();

    const value = parseEther(amount);
    const balanceToCheck =
      user && client && smartBalance !== null
        ? smartBalance
        : (bal?.value as bigint);

    if (value > balanceToCheck) {
      toast.error("Insufficient DMON");
      return;
    }

    const donate = new Promise(async (resolve, reject) => {
      try {
        if (user && client) {
          // Smart Account flow
          const data = encodeFunctionData({
            abi: monfund_ABI,
            functionName: "donateWithMON",
          });

          try {
            // The sendUserOperation might return void when waitForTxn is true
            // so we need to handle it properly
           const res = await sendUserOperationAsync({
              uo: {
                target: id as `0x${string}`,
                value,
                data,
              },
            });
            // console.log(res,"res");
            resolve("campaign funded");
            // If it didn't throw an error, we can assume it succeeded
            setToggle(true);
            // resolve("Campaign funded via Smart Account");
          } catch (smartAccountError: any) {
            reject("Error funding campaign");
          }
        } else {
          // console.log("using regular flow");
          // Regular wallet flow
          try {
            const tx = await writeContract(config, {
              abi: monfund_ABI,
              address: id as `0x${string}`,
              functionName: "donateWithMON",
              value,
            });

            const receipt = await waitForTransactionReceipt(config, {
              hash: tx,
            });

            if (receipt.status === "success") {
              setToggle(true);
              resolve("Campaign funded");
            } else {
              reject("Error funding campaign");
            }
          } catch (walletError: any) {
            reject("Error funding campaign");
          }
        }
      } catch (error: any) {
        reject("Error funding campaign");
      }
    });

    toast.promise(donate, {
      pending: "Funding campaign ...",
      success: {
        render() {
          return "Transaction submitted";
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

      {isConnected || user ? (
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
              onClick={!isPending ? handleDonate : () => null}
            >
              {isPending || isSendingUserOperation ? "Confirming transaction..." : "Fund campaign"}
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => openAuthModal()}
          className="w-full bg-purple-600 text-white py-3 rounded-lg font-medium mb-4"
        >
          Connect wallet to fund
        </button>
      )}
    </>
  );
};

export default Fund;