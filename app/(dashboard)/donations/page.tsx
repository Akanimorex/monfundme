"use client";

import { Gift } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useGetAccountDetails } from "@/utils/hooks/useGetAccountDetails";
import { DonationLog } from "@/types";
import { formatEther } from "viem";
export default function Page() {
    const { accountDetails, isLoading, error } = useGetAccountDetails();

    if (isLoading) return <div className="flex items-center justify-center h-dvh">Loading...</div>;
    if (error) return <div className="flex items-center justify-center h-dvh">Error: {error.message}</div>;

    const donations = accountDetails[0]?.donations || [];

    console.log("donations", donations);

    return (
        <div className="w-full h-dvh px-[36px] mt-6">
            <div className="flex items-center justify-between">
                <h4 className="text-[24px] font-nohemi">My Donations </h4>
                <div className="flex items-center gap-4">
                    <button className="px-3 h-[36px] text-[#8E35FD] font-dmSans text-sm font-semibold border border-[#8E35FD] bg-white rounded-[8px] flex items-center gap-2">
                        <Image src="/svgs/filter.svg" alt="filter" width={16} height={16} />
                        Filter
                    </button>
                    <button className="px-3 h-[36px] text-white font-dmSans text-sm font-semibold bg-[#8E35FD] rounded-[8px] flex items-center gap-2">
                        <Image
                            src="/svgs/download.svg"
                            alt="filter"
                            width={16}
                            height={16}
                        />
                        Export CSV{" "}
                    </button>
                </div>
            </div>

            {/* Table Section */}

            {
                donations.length > 0 ? (
                    <DonationTable donations={donations} />
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-gray-500">No donations found</p>
                    </div>
                )
            }

        </div>
    );
}

const DonationTable = ({ donations }: { donations: DonationLog[] }) => {
    return (
        <div className="mt-6">
            <table className="w-full border-separate border-spacing-0">
                <thead>
                    <tr>
                        <td className="bg-[#F0F2F5] text-left p-3 pl-6 font-nohemi text-[#344054] text-xs first:rounded-tl-[10px]">
                            Campaign Title
                        </td>
                        <td className="bg-[#F0F2F5] text-left px-6 py-4 font-nohemi text-[#344054] text-xs">
                            Amount
                        </td>
                        <td align="center" className="bg-[#F0F2F5] text-left px-6 py-4 font-nohemi text-[#344054] text-xs">
                            Date
                        </td>

                        <td align="right" className="bg-[#F0F2F5] px-6 py-4 font-nohemi text-[#344054] text-xs">TX Hash</td>
                    </tr>
                </thead>

                <tbody>
                    {donations.map((donation, index) => (
                        <tr key={index} className="">
                            <td className="px-6 py-4 flex items-center gap-2  ">
                                <div className="bg-[#8E35FD] p-1 rounded-full ">
                                    <Gift className="text-white  size-[16] " />
                                </div>
                                <h2 className="inline-block max-w-[400px] truncate ">{donation.campaign.title}</h2>
                            </td>
                            <td className="text-[#344054] text-sm font-inter px-6 py-4">
                                {formatEther(donation.amount)} MON
                            </td>
                            <td className="px-6 py-4 text-sm font-inter">
                                {new Date(Number(donation.timestamp) * 1000).toLocaleDateString()}
                            </td>
                            <td align="right" className="px-6 py-4 cusor-pointer ">
                                <a target="_blank" href={`https://testnet.monadexplorer.com/tx/${donation.id}`} className="px-3 py-[3px] underline rounded-full bg-[#EADFF9] text-[#8E35FD] text-sm font-inter font-medium leading-0 ">
                                    View Transaction
                                </a>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}