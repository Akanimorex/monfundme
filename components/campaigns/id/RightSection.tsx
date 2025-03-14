import { Donation } from "@/types";
import { formatEther } from "viem";
import Fund from "../Fund";
import { useAccount } from "wagmi";
import Withdraw from "./Withdraw";
import { formatTimeLeft, roundUpIfLongDecimal } from "@/utils/helpers";


const RightSection = ({ id, donations, currentAmount, targetAmount, percentage, deadline, owner_id }: { id: string, owner_id: string, description: string, donations: Donation[], ownerId: string, currentAmount: bigint, targetAmount: bigint, percentage: number, deadline: number }) => {

    const isCampaignOwner = useAccount()?.address === owner_id;

    return <div className="bg-white rounded-2xl p-6 shadow-xl border-1 border-slate-500 h-fit flex-1 sticky top-[100px] border-[0.5px] border-slate-500/20 ">
        <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2">
                {roundUpIfLongDecimal(Number(formatEther(currentAmount)))} Mon raised
            </h2>
            <div className="flex gap-2 text-gray-600">
                <span>{formatEther(targetAmount)} Mon goal</span>
                <span>•</span>
                <span>{donations?.length || 0} donations</span>
            </div>
        </div>

        <div className="relative h-2 bg-purple-100 rounded-full mb-4 ">
            <div
                className="absolute top-0 left-0 h-full bg-purple-600 rounded-full skill-per "
                style={{ width: `${Math.min(percentage, 100)}%` }}
            />
            <div className="absolute right-[-10px] -top-1">
                <div className="bg-purple-100 rounded-full w-10 h-10 grid place-content-center">
                    <span className="text-sm font-medium">{Math.round(percentage)}%</span>
                </div>
            </div>
        </div>

        <div className="bg-purple-100 text-purple-600 px-4 py-2 rounded-lg inline-block mb-6">
            {formatTimeLeft(deadline)}
        </div>

        {
            isCampaignOwner ? (
                <Withdraw id={id} />
            ) :
                <>
                    <Fund id={id} refetch={() => { }} />

                    <div className="text-center text-gray-600 text-sm">
                        Give from your heart – support this campaign simply because it matters to you.
                    </div>
                </>
        }






    </div>;
};

export default RightSection;
