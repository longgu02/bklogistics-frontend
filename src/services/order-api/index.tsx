import { client } from "../client";
export const getOrders = async () => {
  try {
    const response = await client.get("/orders");
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getAllOrderOnChain = async(_chainId : number) => {
  try {
    const response = await client.get(`/update/onchain/${_chainId}/order`);
    return response;
  } catch (error) {
    console.error(error);
  }
};

export const getAllOrderOnChainByAddress = async (_chainId: number, address: string) => {
  try {
    const response = await client.get(`/orders/${_chainId}/${address}`);
    return response;
  } catch (error) {
    console.error(error);
  }
};