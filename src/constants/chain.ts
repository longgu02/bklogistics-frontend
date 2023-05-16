export const NETWORKS = {
	GOERLI_TESTNET: {
		chainId: 5,
		hexChainId: "0x38",
		blockExplorerUrls: ["https://goerli.etherscan.io/"],
		metadata: {
			chainName: "Goerli Testnet",
			shortName: "BSC",
			// image: BSC,
		},
		nativeCurrency: {
			name: "ETH",
			symbol: "ETH",
			decimals: 18,
		},
	},
	BSC_TESTNET: {
		chainId: 97,
		hexChainId: "0xfa",
		blockExplorerUrls: ["https://bscscan.com/"],
		metadata: {
			chainName: "BSC Testnet",
			shortName: "FTM",
			// image: FTM,
		},
		nativeCurrency: {
			name: "BNB",
			symbol: "BNB",
			decimals: 18,
		},
	},
};

export const getNetworkInfo = (chainId: number) => {
	if (chainId == NETWORKS.GOERLI_TESTNET.chainId)
		return NETWORKS.GOERLI_TESTNET;
	else if (chainId == NETWORKS.BSC_TESTNET.chainId) return NETWORKS.BSC_TESTNET;
	else throw Error("Invalid network");
};
