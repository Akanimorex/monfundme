import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { erc20Abi } from 'viem';
import { toast } from 'react-toastify';
import { mfm_CA } from '@/constant';


function useSign() {
    const { address } = useAccount();
    const { signMessage } = useSignMessage();

    const balance = useReadContract({
        address: mfm_CA as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
    });

    const handleVote = async ({ voteChoice, campaignId }: { voteChoice: string, campaignId: string }) => {

        try {

            const sendVoteResult = (signature: string, message: string, campaignId: string, voteChoice: string) => {

                const postRes = async () => {
                    try {
                        const res = await fetch("/api/vote", {
                            method: "POST",
                            body: JSON.stringify({
                                signature, message, campaignId, voteChoice, address
                            })
                        });

                        if (!res.ok) {
                            throw new Error("Failed to send vote result");
                        }

                        return res.json();
                    } catch (error) {
                        console.log(error);
                    }
                }

                toast.promise(postRes, {
                    pending: "Sending vote result...",
                    success: "Vote result sent successfully",
                    error: "Failed to send vote result"
                });
            }

            if (!address) {
                return console.error("Wallet not connected");
            }
            const message = `vote ${voteChoice} for ${campaignId}`;
            signMessage({ message }, {
                onSuccess: (signature, variables) => {
                    sendVoteResult(signature, variables.message as string, campaignId, voteChoice);
                },
                onError: (error) => {
                    console.log(error);
                }
            });

        } catch (error) {
            console.log(error);
            toast.error("Error signing message", { autoClose: 4000 });
        }
    }

    return { handleVote, balance: balance.data };
}

export default useSign;
