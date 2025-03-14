"use client";

import { Campaign } from "@/types";
import { useGetAccountDetails } from "@/utils/hooks/useGetAccountDetails";
import Link from "next/link";
import Image from "next/image";
import { formatEther } from "viem";
import { formatTimeLeft, getPercentage, } from "@/utils/helpers";
import { Clock } from "lucide-react";
import { StartButton } from "@/components/general";


export default function Page() {

  const { accountDetails, isLoading, error } = useGetAccountDetails();

  if (isLoading) return <div className="flex items-center justify-center h-dvh">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-dvh">Error: {error.message}</div>;

  const campaigns = accountDetails[0]?.campaignsOwned || [];

  if (campaigns.length === 0) return <div className="flex items-center justify-center h-dvh">

    <div className="flex flex-col items-center justify-center gap-4">
      <p >No campaigns created</p>
      <StartButton />
    </div>
  </div>;

  return (
    <div className="w-full h-dvh px-4 lg:px-[36px] mt-6">
      <div className="flex items-center justify-between">
        <h4 className="text-[24px] font-nohemi">Campaigns Created</h4>
        <div className="flex items-center gap-2">
          <h6 className="text-[#909097] text-sm font-dmSans font-semibold">
            Filter by: <span className="text-[#8E35FD]">All Category</span>
          </h6>
        </div>
      </div>

      {/* Map over the campaigns array */}
      <div className="grid_layout mt-4">
        {campaigns.map((campaign: Campaign) => (
          <Link
            key={campaign.id}
            href={`/campaigns/${campaign.id}`}
            className={` h-[300px] flex flex-col shadow-xl rounded-t-xl group border-[0.5px] border-slate-200 `}>
            <div className="h-[55%] shrink-0 relative rounded-t-xl overflow-hidden ">
              <Image
                src={campaign.image || "/images/placeholder.jpg"}
                alt="camp_img"
                className="group-hover:scale-105 transition-all duration-300 ease-in-out "
                fill
                style={{ objectFit: "cover", objectPosition: "top" }}
              />
            </div>
            <div
              className={` gap-1 flex-1 bg-slate-100 rounded-t-xl -mt-2 pt-4 pb-3 px-4 flex flex-col `}>
              <div
                className={`h-[30%] overflow-hidden `}>
                <h2
                  className={`text-sm font-semibold text-[#8E35FD] truncate`}>
                  {campaign?.title?.length > 50
                    ? ` ${campaign.title.slice(0, 50)} ...`
                    : campaign.title}
                </h2>
              </div>

              <div className=" h-[5px] w-full mt-2 bg-gray-300 relative overflow-hidden">
                <div
                  className={` skill-per h-full absolute bg-accent-default top-0 left-0 z-10`}
                  style={{
                    width: `${getPercentage(BigInt(campaign.targetAmount), campaign.currentAmount).toFixed(2)}%`,
                  }}></div>
              </div>
              <div
                className={` text-sm font-semibold flex items-center gap-2`}>
                <p className="flex-1">
                  {Number(formatEther(campaign.currentAmount)).toFixed(2)}{" "}
                  MON
                </p>
                <p>{`${getPercentage(BigInt(campaign.targetAmount), campaign.currentAmount).toFixed(2)} %`}</p>
              </div>

              <div className="flex items-center mt-1 gap-2 text-[#909097]">
                <Clock className="size-4 " />
                <p className="text-sm font-dmSans ">{formatTimeLeft(campaign.deadline)}</p>
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

