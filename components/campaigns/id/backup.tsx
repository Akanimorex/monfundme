"use client";
import CountBox from "../CountBox";
import { useGetOneCampaign } from "@/utils/hooks";
import { formatEther, zeroAddress } from "viem";
import { getPercentage } from "@/utils/helpers";

const Main = ({ id }: { id: string }) => {

	const { campaign, loading: isPending } = useGetOneCampaign(id);
	const dayConvert = 24 * 60 * 60;

	if (isPending) {
		return <div className=" grid place-content-center h-dvh ">Loading...</div>;
	}

	if (!campaign)
		return (
			<div className=" m-[100px] text-center text-2xl font-semibold min-h-dvh">
				Can&apos;t find campaign
			</div>
		);

	const {
		deadline,
		donations,
		image,
		owner_id,
		currentAmount,
		targetAmount,
	} = campaign[0];


	if (owner_id === zeroAddress)
		return (
			<div className=" m-[100px] text-center text-2xl font-semibold min-h-dvh">
				Can&apos;t find campaign
			</div>
		);

	const percentage: number = getPercentage(BigInt(targetAmount), currentAmount);

	return (
		<main className=" max-w-[1200px] mx-auto ">
			<div className=" flex md:flex-row flex-col mt-10 gap-[30px]">
				<div className="flex-1 flex-col">
					<div className=" overflow-hidden rounded-xl ">
						<img
							src={image}
							fetchPriority="high"
							alt="campaign"
							className="w-full h-[410px] object-cover rounded-xl transition-all hover:scale-110 duration-300 ease-in-out "
						/>
					</div>

					<div className="relative w-full h-[5px] bg-gray-300 mt-2">
						<div
							className="absolute h-full bg-accent-default"
							style={{
								width: `${percentage.toFixed(2)}%`,
							}}></div>
						<div className="absolute bottom-0 right-0 mt-[20px] text-accent-default font-bold">
							<p>{`${percentage.toFixed(2)} %`}</p>
						</div>
					</div>
				</div>

				<div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
					<CountBox
						title="Days Left"
						value={Math.floor(
							(Number(deadline) - Date.now() / 1000) / dayConvert
						)}
					/>
					<CountBox
						title={`Mon Raised `}
						value={Number(formatEther(currentAmount))?.toLocaleString()}
					/>
					<CountBox
						title="Total Donors"
						value={donations?.length}
					/>
				</div>
			</div>


		</main>
	);
};

export default Main;
