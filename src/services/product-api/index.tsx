import axios from "axios";
import { testClient, client } from "../client";
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

export const getAllProductOnChain = async (_chainId: number) => {
  const res = await client
    .get(`/products/${_chainId}`)
    .then((results) => {
      return results;
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
};

export const getProductById = async (_chainId: number, _productId: number) => {
  const res = await client
    .get(`/products/${_chainId}/${_productId}/`)
    .then((results) => {
      return results;
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
};

export const updateProductOnChain = async (_chainId: number) => {
  const res = await client
    .get(`/update/onchain/${_chainId}/product`)
    .then((results) => {
      return results;
    })
    .catch((err) => console.error(err));
  return res;
};
