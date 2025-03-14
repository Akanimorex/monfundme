export async function getPendingCampaigns() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/votes/pending`, { next: { revalidate: 1 } });
    const data = await response.json();
    return {
        data
    }
}