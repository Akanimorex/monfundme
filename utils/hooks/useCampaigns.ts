import { useQuery } from '@apollo/client';
import { GET_CAMPAIGNS } from "@/utils/queries";

export function useCampaigns() {
    const { data, loading, error } = useQuery(GET_CAMPAIGNS);

    return {
        campaigns: data?.Campaign || [],
        loading,
        error,
    };
}

// export function useAccount(id: string) {
//     const { data, loading, error } = useQuery(GET_ACCOUNT, {
//         variables: { id },
//     });

//     return {
//         account: data?.account,
//         loading,
//         error,
//     };
// }


