import { Donation } from "@/types";
import { sliceAddress } from "@/utils/helpers";
import { User } from "lucide-react";
import { formatEther } from "viem";

const LeftSection = ({ image, description, owner_id, donations }: { image: string, description: string, owner_id: string, donations: Donation[] }) => {
    return <div>
        <div className="rounded-xl overflow-hidden mb-8">
            <img
                src={image}
                alt="campaign"
                className="w-full h-[400px] object-cover "
            />
        </div>

        <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Campaign Creator</h3>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500 grid place-content-center text-white">
                    C
                </div>
                <div>
                    <p className="font-medium">User</p>
                    <p className="text-sm text-gray-600 break-all">{owner_id}</p>
                </div>
            </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-accent-default">The story</h2>
        <p className="text-gray-600 mb-8">
            {description}
        </p>

        <div className="flex gap-4 mb-8">
            <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium">
                Support Now
            </button>
            <button className="border border-purple-600 text-purple-600 px-6 py-3 rounded-lg font-medium">
                Share with Friends
            </button>
        </div>

        <div className="space-y-4 mb-6">
            {donations && donations.length > 0 ? (
                donations.map((donation: Donation, index) => (
                    <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-purple-500 grid place-content-center text-white">
                                <User className="size-4" />
                            </div>
                            <div>
                                <p className="text-sm font-medium text-accent-default">{sliceAddress(donation.donator_id)}</p>
                                <p className="text-xs text-gray-600">Donated {formatEther(donation.amount)} MON </p>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p className="text-gray-600">No donators yet. Be the first!</p>
            )}
        </div>

    </div>;
};

export default LeftSection;

