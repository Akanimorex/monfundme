"use client";
import { Clock } from "lucide-react";
import Link from "next/link";
import { WrapperContext } from "@/components/dashboard/Wrapper";
import { useContext } from "react";
import { ContextType, PendingCampaign } from "@/types";
import { formatTimeLeft } from "@/utils/helpers";

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
	"bg-cyan-50",
];

export default function Proposals() {
	const { pendingCampaigns, isLoading, error } = useContext(
		WrapperContext
	) as ContextType;

	console.log("pending...", pendingCampaigns);

	if (isLoading) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				Loading...
			</div>
		);
	}

	if (error || !pendingCampaigns.length) {
		return (
			<div className="flex flex-col items-center justify-center h-screen">
				Error: {error?.message || "Error... "}
			</div>
		);
	}

	return (
		<main className="w-full min-h-dvh px-5 lg:px-[36px] mt-6">
			{/* pending campaigns */}
			<div>
				<h4 className="text-[24px] font-nohemi font-bold">Pending Campaigns</h4>
				<p className="text-[#475367] leading-[23px] font-inter max-w-[800px]">
					These proposals are currently under review before becoming official
					campaigns. Below is a list of Pending Campaigns awaiting your
					decision. Please vote thoughtfully for the campaigns, keeping only
					their merits in mind.
				</p>
			</div>

			<div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{pendingCampaigns.map((campaign: PendingCampaign, index: number) => (
					<Link
						href={`proposals/${campaign.proposalId}`}
						key={campaign.id}
						className={`bg-gradient-to-b from-black/10 to-transparent rounded-2xl overflow-hidden p-5 h-[200px] flex flex-col ${
							bgColors[index % bgColors.length]
						}`}>
						<div className="flex items-center justify-between mb-3">
							<div className="flex items-center gap-2">
								<h3 className="text-xl font-bold line-clamp-1">
									{campaign.title}
								</h3>
							</div>
						</div>

						<p className="text-gray-600 mb-4 flex-1 line-clamp-2">
							{campaign.description.slice(0, 200)} ...
						</p>

						<div className="flex justify-between items-center gap-2 text-gray-600 font-bold text-black">
							<span className="text-sm">25k votes</span>
							<span className="flex items-center gap-2 text-sm">
								<Clock className="w-4 h-4" />
								{formatTimeLeft(campaign.deadline)}
							</span>
						</div>
					</Link>
				))}
			</div>
		</main>
	);
}
