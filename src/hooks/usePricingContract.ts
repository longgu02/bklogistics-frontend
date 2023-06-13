import { JsonRpcSigner, ethers } from "ethers";
import { getNetworkAddress } from "../constants/address";
import { RolesContractABI } from "../contract/abis/RolesContractABI";
import { PricingContractABI } from "../contract/abis/PricingABI";

export enum PricingType {
	SUPPLY = 0,
	MANUFACTURE = 1,
}

export enum Unit {
	NONE = 0,
	KILOGRAM = 1,
	METER = 2,
	LITTER = 3,
}

export default function usePricingContract(
	signer: JsonRpcSigner,
	chainId: number
) {
	const contractAddresses = getNetworkAddress(chainId);
	const contract = new ethers.Contract(
		contractAddresses.PRICING_CONTRACT_ADDRESS,
		PricingContractABI,
		signer
	);

	const modifyPrice = async (
		productId: Number,
		type: PricingType,
		price: BigInt,
		unit: Unit
	) => {
		const _promise = await contract.modifyPrice(productId, price, type, unit);
		return _promise;
	};

	const getPrice = async (
		address: string,
		productId: Number,
		type: PricingType
	) => {
		const _promise = await contract.getPrice(address, productId, type);
		return _promise;
	};

	return {
		contract,
		modifyPrice,
		getPrice,
	};
}
