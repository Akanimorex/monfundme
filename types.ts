export interface CategoryDataType {
	id: string;
	name: string;
	icon: string;
}

export type InputIdTypes =
	| "name"
	| "title"
	| "description"
	| "targetAmount"
	| "deadline"
	| "image";

export interface CampaignInput {
	name: string;
	deadline: number;
	image: string;
	targetAmount: number;
	title: string;
	description: string;
	function: "createCampaign";
}

export interface Donation {
	donator_id: string;
	amount: bigint;
	id?: string;
	timestamp?: string;
}

export interface DonationLog {
	amount: bigint;
	campaign: {
		title: string;
	};
	id: string;
	timestamp: string;
	transactionHash: string;
}

export interface Campaign extends CampaignInput {
	owner_id: string;
	currentAmount: bigint;
	donations: Donation[] | [];
	owner: string;
	title: string;
	id: string;
}

export interface DonateInput {
	id: string;
	amount: bigint;
	function: "donateWithMON";
}

export type WriteDataType = CampaignInput | DonateInput;


export interface Timestamp {
	_seconds: number;
	_nanoseconds: number;
}

export interface PendingCampaign {
	id: string;
	proposalId: string;
	title: string;
	description: string;
	targetAmount: number;
	deadline: number;
	imageUrl: string;
	campaignOwner: string;
	status: 'pending' | 'active' | 'completed';
	createdAt: Timestamp;
	queuedAt: Timestamp;
	updatedAt: Timestamp;
}

export interface QueingCampaign {
	id: string;
	proposalId: string;
	title: string;
	description: string;
	deadline: number
}

export interface ContextType {
	pendingCampaigns: PendingCampaign[];
	isLoading: boolean;
	error: Error | null;
}

