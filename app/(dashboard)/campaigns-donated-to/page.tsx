import React from "react";

const campaigns = [
  {
    id: 1,
    title: "Support a Farmer",
    description:
      "Help farmers grow and thrive! Your support provides the resources they need to cultivate a better future.",
    raised: "150 MON",
    progress: 50,
    daysLeft: 5,
    status: "Active",
  },
  {
    id: 2,
    title: "Educate a Child",
    description:
      "Your donation helps provide essential educational resources for children in need.",
    raised: "200 MON",
    progress: 75,
    daysLeft: null,
    status: "Completed",
  },
  {
    id: 3,
    title: "Medical Aid",
    description:
      "Support urgent medical aid for those in need by contributing today.",
    raised: "500 MON",
    progress: 30,
    daysLeft: 7,
    status: "Active",
  },
  {
    id: 4,
    title: "Clean Water Initiative",
    description:
      "Provide clean and safe drinking water to underprivileged communities worldwide.",
    raised: "350 MON",
    progress: 75,
    daysLeft: null,
    status: "Pending",
  },
  {
    id: 5,
    title: "Disaster Relief Fund",
    description:
      "Support emergency response efforts to help communities affected by natural disasters.",
    raised: "400 MON",
    progress: 40,
    daysLeft: 2,
    status: "Active",
  },
  {
    id: 6,
    title: "Animal Welfare",
    description:
      "Help rescue and rehabilitate animals in distress and provide them with safe shelters.",
    raised: "180 MON",
    progress: 80,
    daysLeft: 6,
    status: "Active",
  },
  {
    id: 7,
    title: "Technology for Education",
    description:
      "Help provide laptops and internet access to children in underserved areas.",
    raised: "600 MON",
    progress: 90,
    daysLeft: 4,
    status: "Active",
  },
  {
    id: 8,
    title: "Women Empowerment",
    description:
      "Support programs that empower women with education, skills, and entrepreneurship opportunities.",
    raised: "220 MON",
    progress: 65,
    daysLeft: 8,
    status: "Active",
  },
];

export default function Page() {
  return (
    <div className="w-full h-dvh px-2 mt-6">
      <div className="flex items-center justify-between">
        <h4 className="text-[24px] font-nohemi">Campaigns Donated To</h4>
        <div className="flex items-center gap-2">
          <h6 className="text-[#909097] text-sm font-dmSans font-semibold">
            Filter by: <span className="text-[#8E35FD]">All Category</span>
          </h6>
        </div>
      </div>

      {/* Map over the campaigns array */}
      <div className="mt-[30px] grid grid-cols-3 gap-4 pb-[80px]">
        {campaigns.map((campaign) => (
          <div key={campaign.id}>
            <div className="w-full h-[190px] bg-black rounded-t-[12px]"></div>
            <div className="p-4 border border-[#E8EAF7] rounded-b-[12px]">
              <h5 className="font-nohemi text-[#15161D] font-medium">
                {campaign.title}
              </h5>
              <p className="text-[#212125] text-sm font-dmSans font-normal mb-1">
                {campaign.description}
              </p>
              <div className="">
                <div className="w-full flex">
                  <div className="h-[7px] w-full rounded-[100px] bg-[#F2F2F2]">
                    <span
                      className="skill-per relative block h-full rounded-[100px] bg-[#8E35FD]"
                      style={{ width: `${campaign.progress}%` }}
                    ></span>
                  </div>
                </div>
                <div className="mt-[7px] flex justify-between items-center">
                  <h6 className="font-dmSans text-[#15161D] font-medium">
                    {campaign.raised} <span className="text-xs">raised</span>
                  </h6>
                  <h5 className="font-medium text-sm text-[#15161D] font-dmSans">
                    {campaign.progress}% left
                  </h5>
                </div>
                <div className="mt-[7px]">
                  <h6 className="text-sm font-dmSans font-medium">
                    <span
                      className={`
                      ${campaign.status === "Active" && "text-[#01AD02]"}
                      ${campaign.status === "Completed" && "text-[#8E35FD]"}
                      ${campaign.status === "Pending" && "text-[#FFA500]"}
                    `}
                    >
                      {campaign.status}
                    </span>
                    {campaign.status === "Active" && campaign.daysLeft && (
                      <>: {campaign.daysLeft} days left</>
                    )}
                  </h6>
                </div>
                <button className="mt-[6px] h-[36px] w-[168px] text-sm text-white font-medium bg-[#8E35FD] border-[3px] border-[#BE8CFE] rounded-[35px] shadow-[0px_-5px_2px_0px_#BE8CFE_inset,_0px_5px_2px_0px_#BE8CFE_inset]">
                  View campaign
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-0 left-[16.6667%] w-[84%] p-4 bg-white ">
        <button className="w-full h-[48px] text-white font-medium bg-[#8E35FD] border-[3px] border-[#BE8CFE] rounded-[35px] shadow-[0px_-5px_2px_0px_#BE8CFE_inset,_0px_5px_2px_0px_#BE8CFE_inset]">
          Explore all campaigns
        </button>
      </div>
    </div>
  );
}
