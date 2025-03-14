import { AlertTriangle } from "lucide-react";
import Image from "next/image";
import React from "react";

const cards = [
    {
        title: "Total Funds Raised",
        amount: "$100,000",
        progress: "65%",
        progressBg: "#E7F6EC",
        progressText: "#036B26",
        icon: "/svgs/invest.svg",
    },
    {
        title: "Total Donations Made",
        amount: "$150,000",
        progress: "85%",
        progressBg: "#E7F6EC",
        progressText: "#036B26",
        icon: "/svgs/invest.svg",
    },
    {
        title: "Active Campaigns",
        amount: "20",
        progress: "45%",
        progressBg: "#E7F6EC",
        progressText: "#036B26",
        icon: "/svgs/invest.svg",
    },
];

export default function Page() {
    return (
        <div className="w-full h-dvh px-5 lg:px-[36px] mt-6">
            <h4 className="text-[24px] font-nohemi font-bold">Welcome User</h4>
            <p className="text-[#475367] leading-[23px] font-inter">
                Empower change, one campaign at a time. Track your impact, manage your
                campaigns, and stay <br /> connected with the causes you care about😊
            </p>

            <div className="mt-5 text-red-500 text-sm flex gap-2 items-center">
                <AlertTriangle className="size-4" />
                <p>Stale data, for now! due to time constraint we would do a more structured analysis after the hackathon!</p>
            </div>

            <div className="mt-5 grid grid-cols-12 items-start gap-x-4 gap-y-[35px]">
                <div className="col-span-8 flex flex-col ">
                    <div className="grid grid-cols-3 gap-4 w-full">
                        {cards.map((card, index) => (
                            <div
                                key={index}
                                className="w-full p-4 border border-[#E4E7EC] bg-[#FFF] rounded-[12px] flex items-center justify-between"
                            >
                                <div className="flex flex-col gap-2">
                                    <h5 className="font-nohemi text-sm text-[#475367]">
                                        {card.title}
                                    </h5>
                                    <p className="text-[#344054] text-[20px] font-dmSans font-semibold">
                                        {card.amount}
                                    </p>
                                    <div className="flex items-center gap-1.5">
                                        <div
                                            className="px-1 h-[17px] rounded-[10px] flex items-center gap-[2px]"
                                            style={{ backgroundColor: card.progressBg }}
                                        >
                                            <Image
                                                src="/svgs/progress.svg"
                                                alt="progress"
                                                width={12}
                                                height={12}
                                            />
                                            <h5
                                                className="font-inter text-xs"
                                                style={{ color: card.progressText }}
                                            >
                                                {card.progress}
                                            </h5>
                                        </div>
                                        <h5
                                            className="font-inter text-xs"
                                            style={{ color: card.progressText }}
                                        >
                                            Impact Mode
                                        </h5>
                                    </div>
                                </div>
                                <div className="w-[40px] h-[40px] border border-[#E4E7EC] rounded-full flex items-center justify-center">
                                    <Image src={card.icon} width={20} height={20} alt="icon" />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-5">
                        <h4 className="text-[#101928] text-[18px] font-medium font-nohemi">
                            Active Campaigns Summary
                        </h4>
                        <div className="mt-4 grid grid-cols-4 gap-6">
                            <div className="w-full px-5 pb-[36px] pt-7 bg-[#ECE5F4] rounded-[10px] flex flex-col  ">
                                <Image
                                    src="/svgs/activecampaign.svg"
                                    width={33}
                                    height={33}
                                    alt="campaigns"
                                />
                                <div className="mt-[18px] flex flex-col  gap-2">
                                    <h5 className="text-[#1D2739] text-[24px] font-dmSans font-semibold">
                                        10
                                    </h5>
                                    <h5 className="text-[#1D2739] text-[16px] font-dmSans font-semibold leading-[20px]">
                                        Active <br /> Campaigns
                                    </h5>
                                </div>
                            </div>
                            <div className="w-full px-5 pb-[36px] pt-7 bg-[#FEF6E7] rounded-[10px] flex flex-col  ">
                                <Image
                                    src="/svgs/pendingcampaign.svg"
                                    width={33}
                                    height={33}
                                    alt="campaigns"
                                />
                                <div className="mt-[18px] flex flex-col  gap-2">
                                    <h5 className="text-[#1D2739] text-[24px] font-dmSans font-semibold">
                                        10
                                    </h5>
                                    <h5 className="text-[#1D2739] text-[16px] font-dmSans font-semibold leading-[20px]">
                                        Pending <br /> Campaigns
                                    </h5>
                                </div>
                            </div>
                            <div className="w-full px-5 pb-[36px] pt-7 bg-[#E7F6EC] rounded-[10px] flex flex-col  ">
                                <Image
                                    src="/svgs/approvedcampaign.svg"
                                    width={33}
                                    height={33}
                                    alt="campaigns"
                                />
                                <div className="mt-[18px] flex flex-col  gap-2">
                                    <h5 className="text-[#1D2739] text-[24px] font-dmSans font-semibold">
                                        10
                                    </h5>
                                    <h5 className="text-[#1D2739] text-[16px] font-dmSans font-semibold leading-[20px]">
                                        Approved <br /> Campaigns
                                    </h5>
                                </div>
                            </div>
                            <div className="w-full px-5 pb-[36px] pt-7 bg-[#E3EFFC] rounded-[10px] flex flex-col  ">
                                <Image
                                    src="/svgs/completedcampaign.svg"
                                    width={33}
                                    height={33}
                                    alt="campaigns"
                                />
                                <div className="mt-[18px] flex flex-col  gap-2">
                                    <h5 className="text-[#1D2739] text-[24px] font-dmSans font-semibold">
                                        10
                                    </h5>
                                    <h5 className="text-[#1D2739] text-[16px] font-dmSans font-semibold leading-[20px]">
                                        Completed <br /> Campaigns
                                    </h5>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-4 border border-[#E4E7EC] bg-white py-[23px] rounded-[12px]">
                    <h4 className="text-[#101928] text-[18px] font-medium font-nohemi text-center pb-[30px] border-b border-[#E4E7EC]">
                        Upcoming Campaigns
                    </h4>
                    <div className="py-[30px] border-b border-[#E4E7EC] flex justify-center flex-col gap-3 px-7">
                        <h4 className="text-sm text-[#101928] font-dmSans font-semibold">
                            Raise for Keone and Eunice&apos;s royal Wedding
                        </h4>
                        <p className="text-[#475367] text-xs font-inter">
                            11.30 - 12.00 (30 min)
                        </p>
                        <p className="text-[#475367] text-xs font-inter">
                            The community wants a grand Monad wedding for Keone and Eunice!
                            Help us raise 100,000 MON to make it happen. Your support
                            counts...
                        </p>
                    </div>
                    <div className="mt-[30px] px-7">
                        <button className="w-full bg-[#8E35FD] text-white text-sm font-dmSans font-semibold  rounded-[8px] h-[36px]">
                            Manage Campaigns
                        </button>
                    </div>
                </div>
                <div className="col-span-4 border border-[#E4E7EC] bg-white py-[23px] rounded-[12px]">
                    <h4 className="text-[#101928] text-[18px] font-medium font-nohemi px-6 pb-[30px] border-b border-[#E4E7EC]">
                        Popular Campaigns
                    </h4>
                    <div className="p-6 flex flex-col ">
                        <div className="flex items-start gap-4">
                            <div className="w-[48px] h-[48px] bg-[#F0F2F5] rounded-full flex items-center justify-center shrink-0">
                                <Image src="/svgs/loud.svg" width={20} height={20} alt="icon" />
                            </div>
                            <div className="flex  items-center flex-1 pb-6 border-b border-[#F0F2F5]">
                                <div className="flex flex-col">
                                    <h5 className="text-[#101928] text-[16px] font-dmSans font-medium">
                                        Raise for the LA wildfire victims
                                    </h5>
                                    <p className="text-[#475367] text-sm font-dmSans font-normal">
                                        We intend to raise support to those who were affected by the
                                        wildfire.
                                    </p>
                                </div>
                                <Image
                                    src="/svgs/right.svg"
                                    width={24}
                                    height={24}
                                    alt="icon"
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-[48px] h-[48px] bg-[#F0F2F5] rounded-full flex items-center justify-center shrink-0">
                                <Image src="/svgs/loud.svg" width={20} height={20} alt="icon" />
                            </div>
                            <div className="flex  items-center flex-1 py-6 border-b border-[#F0F2F5]">
                                <div className="flex flex-col">
                                    <h5 className="text-[#101928] text-[16px] font-dmSans font-medium">
                                        Raise for the LA wildfire victims
                                    </h5>
                                    <p className="text-[#475367] text-sm font-dmSans font-normal">
                                        We intend to raise support to those who were affected by the
                                        wildfire.
                                    </p>
                                </div>
                                <Image
                                    src="/svgs/right.svg"
                                    width={24}
                                    height={24}
                                    alt="icon"
                                />
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-[48px] h-[48px] bg-[#F0F2F5] rounded-full flex items-center justify-center shrink-0">
                                <Image src="/svgs/loud.svg" width={20} height={20} alt="icon" />
                            </div>
                            <div className="flex  items-center flex-1 pt-6 ">
                                <div className="flex flex-col">
                                    <h5 className="text-[#101928] text-[16px] font-dmSans font-medium">
                                        Raise for the LA wildfire victims
                                    </h5>
                                    <p className="text-[#475367] text-sm font-dmSans font-normal">
                                        We intend to raise support to those who were affected by the
                                        wildfire.
                                    </p>
                                </div>
                                <Image
                                    src="/svgs/right.svg"
                                    width={24}
                                    height={24}
                                    alt="icon"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-8 border border-[#E4E7EC] bg-white py-[23px] rounded-[12px]">
                    <div className="flex items-center justify-between border-b border-[#E4E7EC] px-6">
                        <h4 className="text-[#101928] text-[18px] font-medium font-nohemi  pb-[30px] ">
                            Recent Donations
                        </h4>
                        <button className="text-[#667185] text-sm font-dmSans font-semibold flex gap-2 items-center">
                            See All
                            <Image src="/svgs/right.svg" width={20} height={20} alt="icon" />
                        </button>
                    </div>
                    <div className="py-6 px-3 flex flex-col ">
                        <div className="flex items-center justify-between">
                            <div className="flex items-start gap-2">
                                <div className="w-[29px] h-[29px] bg-[#8E35FD] rounded-full"></div>
                                <div className="flex flex-col gap-1">
                                    <h5 className="text-[#15161D] font-dmSans text-[20px] font-medium">
                                        User
                                    </h5>
                                    <p className="text-[#15161D] text-xs font-dmSans font-medium">
                                        Today
                                    </p>
                                </div>
                            </div>
                            <div className="py-5 px-6">
                                <button className="px-4 h-[36px] text-[#344054] font-dmSans font-medium border border-[#D0D5DD] bg-white rounded-[8px]">
                                    Today
                                </button>
                            </div>
                            <div className="py-5 px-6">
                                <button className="px-4 h-[36px] text-[#344054] font-dmSans font-semibold border border-[#D0D5DD] bg-white rounded-[8px]">
                                    200 MON donated
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start gap-2">
                                <div className="w-[29px] h-[29px] bg-[#8E35FD] rounded-full"></div>
                                <div className="flex flex-col gap-1">
                                    <h5 className="text-[#15161D] font-dmSans text-[20px] font-medium">
                                        User
                                    </h5>
                                    <p className="text-[#15161D] text-xs font-dmSans font-medium">
                                        Today
                                    </p>
                                </div>
                            </div>
                            <div className="py-5 px-6">
                                <button className="px-4 h-[36px] text-[#344054] font-dmSans font-medium border border-[#D0D5DD] bg-white rounded-[8px]">
                                    Today
                                </button>
                            </div>
                            <div className="py-5 px-6">
                                <button className="px-4 h-[36px] text-[#344054] font-dmSans font-semibold border border-[#D0D5DD] bg-white rounded-[8px]">
                                    200 MON donated
                                </button>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-start gap-2">
                                <div className="w-[29px] h-[29px] bg-[#8E35FD] rounded-full"></div>
                                <div className="flex flex-col gap-1">
                                    <h5 className="text-[#15161D] font-dmSans text-[20px] font-medium">
                                        User
                                    </h5>
                                    <p className="text-[#15161D] text-xs font-dmSans font-medium">
                                        Today
                                    </p>
                                </div>
                            </div>
                            <div className="py-5 px-6">
                                <button className="px-4 h-[36px] text-[#344054] font-dmSans font-medium border border-[#D0D5DD] bg-white rounded-[8px]">
                                    Today
                                </button>
                            </div>
                            <div className="py-5 px-6">
                                <button className="px-4 h-[36px] text-[#344054] font-dmSans font-semibold border border-[#D0D5DD] bg-white rounded-[8px]">
                                    200 MON donated
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}