
import {client} from '../client';
export const getOrders = async () => {
  try {
    const response = await client.get("/orders");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getAllProducts = async (chainId: number) => {
  try {
    const response = await client.get(`/products/${chainId}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (chainId: number, productId: number) => {
  try {
    const response = await client.get(`/products/${chainId}/${productId}`);
    console.log("🚀 ~ file: index.tsx:25 ~ getProductById ~ response:", response)
    return response;
  } catch (error) {
    console.error(error);
  }
};