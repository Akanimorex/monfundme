"use client";
import { useEffect, useState } from "react";
import { Campaign } from "@/types";
import useGetOneCampaign from "./useGetOneCampaign";

const useTrendingCampaigns = () => {
	const [isPending, setIsPending] = useState<boolean>(true);
	const [campaigns, setCampaigns] = useState<Campaign[]>([]);

	const { campaign: campaign_1, loading: isPending_1 } = useGetOneCampaign(
		"0x7308d26500a884070026d18e"
	);
	const { campaign: campaign_2, loading: isPending_2 } = useGetOneCampaign(
		"0x68a8c21aecab5c05117a21c0"
	);
	const { campaign: campaign_3, loading: isPending_3 } = useGetOneCampaign(
		"0xd66a6961e16c15ef22ee1282"
	);

	useEffect(() => {
		if (!isPending_1 && !isPending_2 && !isPending_3) {
			setCampaigns([
				campaign_1 as unknown as Campaign,
				campaign_2 as unknown as Campaign,
				campaign_3 as unknown as Campaign,
			]);
			setIsPending(false);
		}
	}, [isPending_1, isPending_2, isPending_3]);

	return { campaigns, isPending };
};

export default useTrendingCampaigns;
