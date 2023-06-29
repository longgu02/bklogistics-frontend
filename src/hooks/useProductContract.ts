import { JsonRpcSigner, ethers } from "ethers";
import { getNetworkAddress } from "../constants/address";
import { ProductContractABI } from "../contract/abis/ProducContractABI";

export default function useProductContract(
	signer: JsonRpcSigner,
	chainId: number
) {
	const contractAddress = getNetworkAddress(chainId);
	const contract = new ethers.Contract(
		contractAddress.PRODUCT_CONTRACT_ADDRESS,
		ProductContractABI,
		signer
	);
	const getProduct = async (productId: number) => {
		const _promise = contract.getProduct(productId);
		return _promise;
	};
	const addProduct = async (name: string) => {
		const _promise = contract.addProduct(name);
		return _promise;
	};
	const updateProduct = async (productId: number, name: string) => {
		const _promise = contract.updateProduct(productId, name);
		return _promise;
	};
	const removeProduct = async (productId: number) => {
		const _promise = contract.removeProduct(productId);
		return _promise;
	};
	const getRequiredMaterial = async (productId: number) => {
		const _promise = contract.getRequiredMaterial(productId);
		return _promise;
	};
	const getMaterial = async (materialId: number) => {
		const _promise = contract.getMaterial(materialId);
		return _promise;
	};
	const productCounter = async () => {
		const _promise = contract.productCounter();
		return _promise;
	};
	const addRequiredMaterial = async (_productId: number, _materialId: number, _quantity: number, _unit: number) => {
		const _promise = contract.addRequiredMaterial(_productId, _materialId, _quantity, _unit);
		return _promise;
	} 
	return {
		contract,
		getProduct,
		addProduct,
		updateProduct,
		removeProduct,
		getRequiredMaterial,
		getMaterial,
		productCounter,
		addRequiredMaterial,
	};
}
