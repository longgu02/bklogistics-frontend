import { NETWORKS } from "./chain";

export const ADDRESS = {
	GOERLI_TESTNET: {
		ROLES_CONTRACT_ADDRESS: "0xEd76464E3652d99Dd24B2c2Dd745204FcFb8a44D",
		SUPPLY_CHAIN_CONTRACT_ADDRESS: "0x0F4E2fCAfA682fdAB8aa221Da7d82B3B2B48EE36",
		SHIPMENT_CONTRACT_ADDRESS: "0xaEed9419B26f63b963C37979B376c9b8F45d4be4",
		PRODUCT_CONTRACT_ADDRESS: "0x2D42e4Ec679A72fedB00CCb6181530f5EC6Ec7C6",
		SBT_CONTRACT_ADDRESS: "0x76E02A0F37878495791CA9EE140992A2939d5714",
		PRICING_CONTRACT_ADDRESS: "0x616E5db0212DbC3b2eB2504e1085ef4C968E87C9",
	},
	BSC_TESTNET: {
		ROLES_CONTRACT_ADDRESS: "",
		SUPPLY_CHAIN_CONTRACT_ADDRESS: "",
		SHIPMENT_CONTRACT_ADDRESS: "",
		PRODUCT_CONTRACT_ADDRESS: "",
		PRICING_CONTRACT_ADDRESS: "",
		SBT_CONTRACT_ADDRESS: "",
	},
};

export const getNetworkAddress = (chainId: number) => {
	if (chainId == -1) {
		return ADDRESS.GOERLI_TESTNET;
	} else {
		if (chainId == NETWORKS.GOERLI_TESTNET.chainId)
			return ADDRESS.GOERLI_TESTNET;
		else if (chainId == NETWORKS.BSC_TESTNET.chainId)
			return ADDRESS.BSC_TESTNET;
		else throw Error(`Invalid network ${chainId}`);
	}
	// else
	// 	return {
	// 		ROLES_CONTRACT_ADDRESS: "",
	// 		SUPPLY_CHAIN_CONTRACT_ADDRESS: "",
	// 		SHIPMENT_CONTRACT_ADDRESS: "",
	// 		PRODUCT_CONTRACT_ADDRESS: "",
	// 		PRICING_CONTRACT_ADDRESS: "",
	// 		SBT_CONTRACT_ADDRESS: "",
	// 	};
};
