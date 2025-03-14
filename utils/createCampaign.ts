import { CampaignInput } from "@/types";

export const createCampaign = async (data: any) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/votes/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error("Failed to create campaign");
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error("Error in createCampaign:", error);
        return { error: "Failed to create campaign" };
    }
};
