import { formatEther } from "viem";

interface ObjData {
	targetDate: string | number | Date;
}

export const convertDate = (date: string): number => {
	const objData: ObjData = {
		targetDate: date,
	};

	const timestampInSeconds = Math.floor(
		new Date(objData.targetDate).getTime() / 1000
	);

	return timestampInSeconds;
};

export const getPercentage = (
	targetAmount: bigint,
	totalDonated: bigint
): number => {
	if (!targetAmount || !totalDonated) return 0.0;

	const f_targetAmount = Number(formatEther(targetAmount));
	const f_totalDonated = Number(formatEther(totalDonated));
	const percentage = (f_totalDonated / f_targetAmount) * 100;
	return percentage;
};

export const sliceAddress = (address: string): string => {
	return address.slice(0, 4) + "..." + address.slice(-4);
};

export const getDaysAgo = (timestamp: string | number | Date): string => {

	console.log("timestamp", timestamp);
	const now = new Date();
	const pastDate = new Date(Number(timestamp) * 1000);
	console.log("pastDate", pastDate);
	const diffInTime = now.getTime() - pastDate.getTime();
	const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));

	if (diffInDays === 0) {
		return 'Today';
	} else if (diffInDays === 1) {
		return '1 day ago';
	} else {
		return `${diffInDays} days ago`;
	}
};


export const formatTimeLeft = (deadline: number): string => {

	console.log("deadline", deadline);

	const now = Math.floor(Date.now() / 1000);
	const timeLeft = deadline - now;

	if (timeLeft <= 0) return "Ended";

	const days = Math.floor(timeLeft / (24 * 60 * 60));
	const hours = Math.floor((timeLeft % (24 * 60 * 60)) / (60 * 60));
	const minutes = Math.floor((timeLeft % (60 * 60)) / 60);
	if (days > 0) return `${days} days left`;
	return hours > 0 ? `${hours}h left` : `${minutes}m left`;
}

export const timeLeftForMidnight = () => {
	const now = new Date();
	const tomorrowMidnight = new Date(now);
	tomorrowMidnight.setDate(now.getDate() + 1);
	tomorrowMidnight.setHours(0, 0, 0, 0);
	const timeDifference = Number(tomorrowMidnight) - Number(now);
	const hoursLeft = (timeDifference / (1000 * 60 * 60)).toFixed(1);

	return Number(hoursLeft) > 1 ? `${hoursLeft} hours left` : "Less than 1 hour left";
}

export const roundUpIfLongDecimal = (num: number): number => {
	const decimalCount = (num.toString().split('.')[1] || '').length;
	if (decimalCount > 5) {
		return Number(num.toFixed(5));
	}
	return num;
};

