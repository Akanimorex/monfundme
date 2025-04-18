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
  useSmartAccountClient,
} from "@account-kit/react";

const Nav = () => {
  const router = useRouter();
  const { openConnectModal } = useConnectModal();
  const { isConnected } = useAccount();
  const { openAuthModal } = useAuthModal();
  const { logout } = useLogout();
  const { client, address, isLoadingClient } = useSmartAccountClient({});
  const signerStatus = useSignerStatus();
  const user = useUser();

  const handleLogin = async () => {
    try {
      if (!isConnected && openConnectModal) {
        // Try Metamask (Wagmi)
        await openConnectModal();
      }
      // If Metamask rejected or not available, fallback to social login
      if (!isConnected && !user) {
        openAuthModal();
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleClick = () => {
    if (isConnected || user) {
      router.push("/dashboard");
    } else {
      openAuthModal();
    }
  };

  const displayName =
    user?.email ||
    (address ? sliceAddress(address as `0x${string}`) : "Anonymous");

  return (
    <nav className="fixed top-0 w-full p-2 lg:p-4 bg-background z-50 shadow-xl">
      <main className="flex items-center justify-between gap-2 width_to_center">
        <Link
          href="/campaigns"
          className="flex items-center gap-1 hover:bg-l_yellow px-4 py-2 rounded-md"
        >
          <Search />
          <p>Search</p>
        </Link>

        <MonfundmeLogo />

        

        <button
          onClick={handleClick}
          className="hover:scale-105 bg-accent-default text-white ease-linear duration-150 transition-all border-2 px-4 py-2 border-accent-default rounded-lg font-bold"
        >
          {isConnected || user
            ? `Profile | ${displayName ?? "Connected"}`
            : "Connect / Login"}
        </button>
      </main>
    </nav>
  );
};

export default Nav;
