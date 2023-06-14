import { JsonRpcSigner, ethers } from "ethers";
import { getNetworkAddress } from "../constants/address";
import { RolesContractABI } from "../contract/abis/RolesContractABI";
import { PricingContractABI } from "../contract/abis/PricingABI";

export enum PricingType {
	MATERIAL = 0,
	PRODUCT = 1,
}

export enum Unit {
	NONE = 0,
	KILOGRAM = 1,
	METER = 2,
	LITRE = 3,
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
		price: BigInt,
		isListed: boolean,
		type: PricingType,
		unit: Unit
	) => {
		const _promise = await contract.modifyPrice(
			productId,
			price,
			isListed,
			type,
			unit
		);
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
