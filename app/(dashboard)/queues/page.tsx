import { formatTimeLeft } from "@/utils/helpers"
import { Clock } from "lucide-react"
import { QueingCampaign } from "@/types"

const bgColors = [
    "bg-purple-50",
    "bg-blue-50",
    "bg-green-50",
    "bg-yellow-50",
    "bg-red-50",
    "bg-pink-50",
    "bg-indigo-50",
    "bg-teal-50",
    "bg-orange-50",
    "bg-cyan-50"
];

const Queueing = () => {

    return <div>
        <div>
            <h4 className="text-[24px] font-nohemi font-bold">Queueing Campaigns</h4>
            <p className="text-[#475367] leading-[23px] font-inter max-w-[800px]">
                These campaigns are currently in the queue and waiting to be approved. Please be patient and wait for them to be approved.
            </p>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[].map((campaign: QueingCampaign, index: number) => (
                <div
                    key={campaign.id}
                    className={`bg-gradient-to-b from-black/10 to-transparent rounded-2xl overflow-hidden p-5 h-[200px] flex flex-col ${bgColors[index % bgColors.length]}`}
                >
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <h3 className="text-xl font-bold line-clamp-1">{campaign.title}</h3>
                        </div>
                    </div>

                    <p className="text-gray-600 mb-4 flex-1 line-clamp-2">{campaign.description.slice(0, 200)} ...</p>

                    <div className="flex justify-between items-center gap-2 text-gray-600 font-bold text-black">
                        <span className="text-sm">
                            25k votes
                        </span>
                        <span className="flex items-center gap-2 text-sm">
                            <Clock className="w-4 h-4" />
                            {formatTimeLeft(campaign.deadline)}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    </div>;
};

export default Queueing;