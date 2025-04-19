"use client";
import { useAccount } from "wagmi";
import { createContext } from "react";
import { ConnectModal } from "../general";
import useSWR from "swr";
import { ContextType } from "@/types";
import { useUser } from "@account-kit/react";


export const WrapperContext = createContext<null | ContextType>(null)

const Wrapper = ({ children }: { children: React.ReactNode }) => {
    const { address } = useAccount();
    const user = useUser();

    const fetcher = (url: string) => fetch(url).then(res => res.json())
    const { data: pendingCampaigns, error, isLoading } = useSWR(`${process.env.NEXT_PUBLIC_API_URL}/votes/pending`, fetcher, { revalidateOnMount: true, revalidateOnFocus: true, revalidateOnReconnect: true, refreshInterval: 5 })

    const value = {
        pendingCampaigns,
        isLoading,
        error,

    }

    const isLoggedIn = address || user;

    if (!isLoggedIn) {
        return <div className="flex flex-col items-center justify-center h-screen" >
            <div className="flex flex-col items-center justify-center" >
                <h1 className="text-2xl font-bold my-2 " > Connect your wallet </h1>

                <ConnectModal />
            </div>
        </div>
    }

    return <>
        <WrapperContext.Provider value={value}>
            {children}
        </WrapperContext.Provider>
    </>;

};

export default Wrapper;