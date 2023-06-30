import axios from "axios";
import { testClient } from "../client";
import { PricingType } from "../../hooks/usePricingContract";

export const getProduct = async (chainId: number) => {
	const promise = await testClient.get(`/products/${chainId}`);
	return promise;
};

export const getMaterial = async (chainId: number) => {
	const promise = await testClient.get(`/materials/${String(chainId)}`);
	return promise;
};

export const getProductAndMaterial = async (chainId: number) => {
	let allProducts: Array<{ productId: Number; name: string }> = [];
	const _productPromise = await testClient.get(`/products/${chainId}`);

	const _materialPromise = await getMaterial(chainId);

	if (_productPromise.products) {
		allProducts = [..._productPromise.products];
	}
	if (_productPromise.products) {
		allProducts = [...allProducts, ..._materialPromise.materials];
	}

	return allProducts;
};
