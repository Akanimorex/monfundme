import { type Chain } from "viem";
export const monadTestnet = {
	id: 10143,
	name: "Monad Testnet",
	nativeCurrency: { name: "DMON", symbol: "DMON", decimals: 18 },
	rpcUrls: {
		default: {
			http: ["https://testnet-rpc.monad.xyz/"],
		},
	},
	blockExplorers: {
		default: {
			name: "Monadexplorer",
			url: "https://testnet.monadexplorer.com/",
		},
	},
} as const satisfies Chain;
