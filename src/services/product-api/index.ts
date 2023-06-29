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
	// await getProduct(chainId).then((res) => {
	// 	Promise.all(
	// 		res.map((product: any) => {
	// 			allProducts.push(product);
	// 		})
	// 	);
	// });
	const _materialPromise = await getMaterial(chainId);
	console.log(_materialPromise);
	// await Promise.all(_materialPromise);
	allProducts = [..._productPromise.products, ..._materialPromise.materials];

	return allProducts;
};
