import {
	BrowserProvider,
	JsonRpcProvider,
	JsonRpcSigner,
	ethers,
} from "ethers";

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

export const storeJWT = (address: string, jwt: string) => {
	localStorage.setItem(address, jwt);
};

export const getStoredJWT = (address: string) => {
	const jwt = localStorage.getItem(address);
	return jwt;
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

export const random = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getNonce = () => {
	const len1 = random(2, 10);
	let _to = 3;
	Array(len1)
		.fill(0)
		.forEach((_) => {
			return (_to = _to * random(2, 10));
		});
	return random(2, _to);
};

export const ethersAuthenticate = async (
	message: string,
	signer: JsonRpcSigner
) => {
	try {
		// const _mes = ethers.hexlify(message);
		return {
			message: await signer.signMessage(message),
			error: undefined,
		};
	} catch (error) {
		return {
			message: undefined,
			error,
		};
	}
};

export function isTokenExpired(token: string) {
	const base64Url = token.split(".")[1];
	const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
	const jsonPayload = decodeURIComponent(
		atob(base64)
			.split("")
			.map(function (c) {
				return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
			})
			.join("")
	);

	const { exp } = JSON.parse(jsonPayload);
	const expired = Date.now() >= exp * 1000;
	return expired;
}

export const convertBase64 = (file: File) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);

		fileReader.onload = () => {
			resolve(fileReader.result);
		};

		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};
