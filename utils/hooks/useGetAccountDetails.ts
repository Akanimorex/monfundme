"use client";
import { useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { DonationLog, Campaign } from "@/types";
import { GET_ACCOUNT } from "../queries";

interface AccountData {
    Account: {
        id: string;
        donations: DonationLog[];
        campaignsOwned: Campaign[];
    }[];
}

export const useGetAccountDetails = () => {
    const { address } = useAccount();

    const { data, loading, error } = useQuery<AccountData>(GET_ACCOUNT, {
        variables: { id: address },
        skip: !address,
    });

    return {
        accountDetails: data?.Account || [],
        isLoading: loading,
        error: error,
    };
};
