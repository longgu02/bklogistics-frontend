import { client } from "../client";

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
