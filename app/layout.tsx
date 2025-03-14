import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Web3Provider from "@/web3/config";
import ApolloClientProvider from "@/web3/Apollo";

const dmSans = DM_Sans({
	variable: "--font-dm-sans",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Monfudme",
	description: "Crowdfundig just got easier",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${dmSans.variable} antialiased`}>
				<Web3Provider>
					<ApolloClientProvider>
						{children}
					</ApolloClientProvider>
				</Web3Provider>
			</body>
		</html>
	);
}
