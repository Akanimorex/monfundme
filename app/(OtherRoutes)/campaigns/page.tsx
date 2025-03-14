"use client";
import { GetCampaigns, SearchForm } from "@/components/campaigns";
import { StartButton } from "@/components/general";
import { Suspense } from "react";

const Page = () => {


	return (
		<div className=" py-[100px] lg:pt-[125px] p-3 min-h-dvh ">
			<main className=" width_to_center ">
				<h2 className=" text-[35px] font-extrabold  text-center">
					Find fundraising campaigns
				</h2>
				<p className=" text-center">
					Search for campaigns by creator&apos;s address, funding category or
					keyword
				</p>

				<Suspense
					fallback={
						<div className=" h-[500px] grid place-content-center ">
							Loading...
						</div>
					}>
					<SearchForm />
					<section>
						<div className=" flex items-center justify-between my-4">
							<h2 className="text-2xl font-semibold my-2 ">Active campaigns</h2>
							<StartButton />
						</div>
						<GetCampaigns />
					</section>
				</Suspense>
			</main>
		</div>
	);
};

export default Page;
