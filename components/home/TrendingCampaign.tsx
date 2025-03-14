"use client";
import { CampaignCard } from "../general";
import { Campaign } from "@/types";
import LoadingCard from "../general/LoadingCard";
import { useQuery } from "@apollo/client";
import { GET_CAMPAIGNS } from "@/utils/queries";
import { useEffect, useState } from "react";

const TrendingCampaign = () => {

	const { data, loading, error } = useQuery(GET_CAMPAIGNS);

	const [campaigns, setCampaigns] = useState<Campaign[]>([]);

	useEffect(() => {
		if (data) {
			console.log("campaigns.... trending", data.Campaign.slice(0, 3));
			setCampaigns(data.Campaign.slice(0, 3));
		} else {
			setCampaigns([]);
		}
	}, [data, loading, error]);

	if (error) {
		console.log("error from getCampaigns", error);
		return;
	}

	if (loading) {
		return [1, 2, 3].map((i: number) => (
			<LoadingCard
				key={i}
				isTrending={true}
			/>
		));
	}



	return (
		<>
			{campaigns &&
				campaigns.map((campaign: Campaign, index: number) => (
					<CampaignCard
						campaign={campaign}
						key={index}
						// key={campaign._id}
						isTrending
					/>
				))}
		</>
	);
};

export default TrendingCampaign;
