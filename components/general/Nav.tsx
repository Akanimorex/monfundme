"use client";
import { Search } from "lucide-react";
import Link from "next/link";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import MonfundmeLogo from "./MonfundmeLogo";
import { sliceAddress } from "@/utils/helpers";


import {
  useAuthModal,
  useLogout,
  useSignerStatus,
  useUser,
} from "@account-kit/react";


const Nav = () => {
	const { openConnectModal } = useConnectModal();
	const { address, isConnected } = useAccount();
	const { push } = useRouter();

//alchemy code
	const user = useUser();
	const { openAuthModal } = useAuthModal();
	const signerStatus = useSignerStatus();
	const { logout } = useLogout();

	const handleDisconnect = () => {
		push("/dashboard");
	};

	const handleConnect = () => {
		try {
			openConnectModal && openConnectModal();
		} catch (error) {
			console.error("connect error --- ", error);
		}
	};

	return (
		<nav className="fixed top-0 w-full p-2 lg:p-4 bg-background z-50 shadow-xl ">
			<main className="flex items-center justify-between gap-2 width_to_center ">
				<Link
					href="/campaigns"
					className="flex items-center gap-1 hover:bg-l_yellow px-4 py-2 rounded-md">
					<Search />
					<p>Search</p>
				</Link>

				<MonfundmeLogo />

				<button
					onClick={isConnected ? handleDisconnect : handleConnect}
					className=" hover:scale-105 bg-accent-default text-white  ease-linear duration-150 transition-all border-2 px-4 py-2 border-accent-default rounded-lg font-bold ">
					{isConnected
						? ` Profile | ${sliceAddress(address as `0x${string}`)}`
						: "connect wallet"}
				</button>
				<button className="akui-btn akui-btn-primary" onClick={openAuthModal}>
					Login
				</button>
			</main>
		</nav>
	);
};

export default Nav;
