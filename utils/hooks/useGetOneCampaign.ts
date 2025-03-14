"use client";

import { useQuery } from "@apollo/client";
import { GET_CAMPAIGN_BY_ID } from "../queries";
import { Campaign } from "@/types";

const useGetOneCampaign = (id: string) => {
	const { data, loading, error } = useQuery(GET_CAMPAIGN_BY_ID, {
		variables: { id },
		pollInterval: 3000
	});

	return { campaign: data?.Campaign as Campaign[] || [], loading, error };
};

export default useGetOneCampaign;
