import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Web3Provider from "@/web3/config";
import ApolloClientProvider from "@/web3/Apollo";



import { config } from "@/config";
import { cookieToInitialState } from "@account-kit/core";
import { headers } from "next/headers";
import "./globals.css";
import { Providers } from "./providers";

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Monfudme",
	description: "Crowdfundig just got easier",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const initialState = cookieToInitialState(
		config,
		(await headers()).get("cookie") ?? undefined
	  );
	return (
		<html lang="en">
			<body
				className={`${dmSans.variable} antialiased`}>
				<Web3Provider>
					<ApolloClientProvider>
						<Providers initialState={initialState}>
							{children}
						</Providers>
					</ApolloClientProvider>
				</Web3Provider>
			</body>
		</html>
	);
}
