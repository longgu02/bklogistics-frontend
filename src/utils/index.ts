import { BrowserProvider, JsonRpcProvider, JsonRpcSigner } from "ethers";

export const formatAddress: (
	arg0: string,
	arg1: number
) => string | undefined = (address: string, fractionDigits: number = 3) => {
	try {
		return (
			address.slice(0, fractionDigits) + "..." + address.slice(-fractionDigits)
		);
	} catch (error) {
		return undefined;
	}
};

export const storeSession = (
	provider: BrowserProvider,
	signer: JsonRpcSigner
) => {
	// localStorage.setItem("metamaskSigner", JSON.stringify(signer));
	sessionStorage.setItem("metamaskSigner", JSON.stringify(signer));
};

export const getSessionInfo = (provider: BrowserProvider) => {
	const signer = sessionStorage.getItem("metamaskSigner");
	return {
		signer: signer
			? new JsonRpcSigner(provider, JSON.parse(signer).address)
			: undefined,
	};
};

export const removeSessionInfo = () => {
	sessionStorage.removeItem("metamaskSigner");
};
