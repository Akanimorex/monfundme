import Image from "next/image";
import Link from "next/link";
import { Wallet } from "lucide-react";
import { Campaign } from "@/types";
import { formatEther, zeroAddress } from "viem";
import { getPercentage } from "@/utils/helpers";
import LoadingCard from "./LoadingCard";

const CampaignCard = ({
	campaign,
	isTrending,
}: {
	campaign: Campaign;
	isTrending: boolean;
}) => {
	if (!campaign || campaign.owner === zeroAddress)
		return <LoadingCard isTrending />;

	const percentage: number = getPercentage(
		BigInt(campaign.targetAmount),
		campaign.currentAmount
	);

	return (
		<Link
			href={`/campaigns/${campaign.id}`}
			className={` ${isTrending ? "h-[500px]" : "h-[300px]"
				} flex flex-col shadow-xl rounded-t-xl group border-[0.5px] border-slate-200 `}>
			<div className="h-[55%] shrink-0 relative rounded-t-xl overflow-hidden -z-10  ">
				<Image
					src={campaign.image || "/images/placeholder.jpg"}
					alt="camp_img"
					className="group-hover:scale-105 transition-all duration-300 ease-in-out "
					fill
					style={{ objectFit: "cover", objectPosition: "top" }}
				/>
			</div>
			<div
				className={` ${isTrending ? "gap-2" : "gap-1"
					} flex-1 bg-slate-100 rounded-t-xl -mt-2 pt-4 pb-3 px-4 flex flex-col `}>
				<div
					className={` ${isTrending ? "h-[60%]" : "h-[30%]"} overflow-hidden `}>
					<h2
						className={`${isTrending ? "text-xl leading-5" : "leading-4"
							} font-bold `}>
						{campaign?.title?.length > 50
							? ` ${campaign.title.slice(0, 50)} ...`
							: campaign.title}
					</h2>
					{isTrending && (
						<p className=" leading-[16px] mt-2 flex-1 text-black/90">
							{campaign.description.length > 150
								? ` ${campaign.description.slice(0, 150)} ...`
								: campaign.description}
						</p>
					)}
				</div>

				<div className=" h-[5px] w-full mt-4 bg-gray-300 relative overflow-hidden">
					<div
						className={` skill-per h-full absolute bg-accent-default top-0 left-0 z-10`}
						style={{
							width: `${percentage.toFixed(2)}%`,
						}}></div>
				</div>
				<div
					className={` ${isTrending ? "" : "text-sm"
						} font-semibold flex items-center gap-2`}>
					<p className="flex-1">
						{Number(formatEther(campaign.currentAmount)).toFixed(2)}{" "}
						MON
					</p>
					<p>{`${percentage.toFixed(2)} %`}</p>
				</div>

				<div className=" flex items-center gap-2 ">
					<div className=" p-2 bg-accent-default rounded-full">
						<Wallet
							className=" text-white font-bold "
							size={isTrending ? 16 : 13}
						/>
					</div>
					<p className={isTrending ? "" : "text-sm"}>{`${campaign ? campaign.owner_id?.slice(
						0,
						4
					) : ""}...${campaign ? campaign.owner_id?.slice(-6) : ""}`}</p>
				</div>
			</div>
		</Link>
	);
};

export default CampaignCard;
