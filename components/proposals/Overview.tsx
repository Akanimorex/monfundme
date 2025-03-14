import { Share2, User } from "lucide-react";
import { getDaysAgo, sliceAddress, timeLeftForMidnight } from "@/utils/helpers";

export default function Overview({ proposal }: { proposal: any }) {

    const daysAgo = getDaysAgo(proposal?.createdAt._seconds);

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{proposal?.title}</h2>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Active
                </span>
            </div>

            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-500 grid place-content-center text-white">
                        <User className="text-white  size-[20] " />
                    </div>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-medium ">{sliceAddress(proposal?.campaignOwner)}</span>
                        </div>
                        <p className="text-sm text-gray-500">Created • {daysAgo} </p>
                    </div>
                </div>
                <button className="flex items-center gap-2 text-gray-600">
                    <Share2 className="w-5 h-5" /> Share
                </button>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-4">Campaign summary</h3>
                    <p className="text-gray-600 leading-relaxed">
                        {proposal?.description}
                    </p>
                </div>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>{proposal?.votes?.length ? proposal.votes.length : 0} votes</span>
                    <span>•</span>
                    <span>{timeLeftForMidnight()}</span>
                </div>
            </div>
        </div>
    )
}