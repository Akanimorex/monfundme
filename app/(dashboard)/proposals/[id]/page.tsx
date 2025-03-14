"use client";

import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import { Overview, CastVote, Votes } from "@/components/proposals";
import { WrapperContext } from "@/components/dashboard/Wrapper";

interface TimelineEvent {
	label: string;
	date: string;
	time: string;
}

export default function ProposalPage() {
	const [proposal, setProposal] = useState<any>();
	const { pendingCampaigns, loading } = useContext<any>(WrapperContext);
	const { id: campaignId } = useParams();

	useEffect(() => {
		const fetchProposal = async () => {
			console.log("pendingCampaigns", pendingCampaigns);
			const proposal = await pendingCampaigns?.find(
				(campaign: any) => campaign.proposalId === campaignId
			);
			setProposal(proposal);
		};
		fetchProposal();
	}, [campaignId]);

	const [isVote, setIsVote] = useState(false);

	console.log("proposal", proposal);

	const timeline: TimelineEvent[] = [
		{
			label: "Date Created",
			date: new Date(proposal?.createdAt._seconds * 1000).toLocaleDateString(),
			time: new Date(proposal?.createdAt._seconds * 1000).toLocaleTimeString(),
		},
		{
			label: "Date Queued",
			date: new Date(proposal?.queuedAt._seconds * 1000).toLocaleDateString(),
			time: new Date(proposal?.queuedAt._seconds * 1000).toLocaleTimeString(),
		},
		{
			label: "End date",
			date: new Date(proposal?.deadline * 1000).toLocaleDateString(),
			time: new Date(proposal?.deadline * 1000).toLocaleTimeString(),
		},
	];

	if (!loading && !proposal) {
		return <div>Proposal not found</div>;
	}

	return (
		<main className="max-w-[1200px] mx-auto px-5 lg:px-[36px] py-8">
			<h1 className="text-3xl font-bold mb-4">Campaign proposal voting</h1>

			{/* Navigation */}
			<div className="border-b mb-8">
				<nav className="flex items-center ">
					<button
						className={`text-purple-600 b pb-4 pr-4 ${
							!isVote && "border-b-2 border-purple-600"
						}`}
						onClick={() => setIsVote(false)}>
						Overview
					</button>
					<button
						className={`text-gray-600 pb-4 px-4 flex items-center gap-2 ${
							isVote && "border-b-2 border-purple-600"
						}`}
						onClick={() => setIsVote(true)}>
						Votes{" "}
						<span className="bg-purple-600 text-white text-sm px-2 rounded-full">
							{proposal?.votes?.length ? proposal.votes.length : 0}
						</span>
					</button>
				</nav>
			</div>

			<div className="grid lg:grid-cols-[1fr_400px] gap-8">
				<div>{isVote ? <Votes /> : <Overview proposal={proposal} />}</div>
				<CastVote
					timeline={timeline}
					campaignId={campaignId as string}
					proposal={proposal}
				/>
			</div>
		</main>
	);
}
