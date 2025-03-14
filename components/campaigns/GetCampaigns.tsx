"use client";
import { Campaign } from "@/types";
import { CampaignCard } from "../general";
import { zeroAddress } from "viem";
import InfiniteFetch from "./InfiniteFetch";
import { useCampaigns } from "@/utils/hooks/useCampaigns";
import { useEffect, useState } from "react";

const GetCampaigns = () => {
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);
	const [isPending, setIsPending] = useState(true);
	const [error, setError] = useState<Error | null>(null);

	const { campaigns: _campaigns, loading, error: _error } = useCampaigns();

	useEffect(() => {
		setIsPending(loading);

		if (_error) {
			setError(_error);
		}

		if (_campaigns && _campaigns.length > 0) {
			setCampaigns(_campaigns);
		}
	}, [loading, _error, _campaigns]);

	if (isPending) {
		return (
			<div className="h-[300px] grid place-content-center">Loading...</div>
		);
	}

	if (error) {
		return (
			<div className="h-[300px] grid place-content-center">
				Error loading campaigns: {error.message}
			</div>
		);
	}

	if (!campaigns || campaigns.length === 0) {
		return (
			<div className="h-[300px] grid place-content-center">
				No Active Campaigns...
			</div>
		);
	}

	return (
		<>
			<div className="grid_layout">
				{campaigns.map((campaign: Campaign) =>
					campaign.owner !== zeroAddress ? (
						<CampaignCard
							key={campaign.id}
							isTrending={false}
							campaign={campaign}
						/>
					) : null
				)}
			</div>
			<InfiniteFetch
				limits={{
					lowerLimit: 0,
					upperLimit: campaigns.length
				}}
				setLimits={() => { }}
				isPending={isPending}
			/>
		</>
	);
};

export default GetCampaigns;
