"use client";
import { useGetOneCampaign } from "@/utils/hooks";
import { zeroAddress } from "viem";
import { getPercentage } from "@/utils/helpers";
import RightSection from "./RightSection";
import LeftSection from "./LeftSection";
const Main = ({ id }: { id: string }) => {
	const { campaign, loading: isPending, error } = useGetOneCampaign(id);

	if (error) {
		console.log("error from getOneCampaign", error);
		return;
	}

	if (isPending) {
		return <div className="grid place-content-center h-dvh">Loading...</div>;
	}

	if (!campaign || campaign[0].owner_id === zeroAddress) {
		return (
			<div className="m-[100px] text-center text-2xl font-semibold min-h-dvh">
				Can&apos;t find campaign
			</div>
		);
	}

	const {
		deadline,
		description,
		donations,
		image,
		currentAmount,
		title,
		targetAmount,
		owner_id
	} = campaign[0];

	const percentage = getPercentage(BigInt(targetAmount), currentAmount);

	return (
		<main className="max-w-[1200px] mx-auto p-6">
			<h1 className="text-4xl font-bold mb-8">{title}</h1>

			<div className="grid lg:grid-cols-[2fr_1fr] gap-8">
				{/* Left Column */}
				<LeftSection image={image} description={description} owner_id={campaign[0].owner_id} donations={donations} />

				{/* Right Column */}
				<RightSection id={id} owner_id={campaign[0].owner_id} description={description} donations={donations} currentAmount={currentAmount} targetAmount={BigInt(targetAmount)} percentage={percentage} deadline={deadline} ownerId={owner_id} />
			</div>
		</main>
	);
};

export default Main;
