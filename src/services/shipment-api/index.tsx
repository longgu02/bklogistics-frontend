import { client } from "../client";
export interface shipment {
  orderId: number;
  sender: string;
  carrier: string;
  receiver: string;
  chainId: number;
  create_date: number;
}
export const createShipment = async (shipment: shipment) => {
  try {
    const res = await client.post("/shipments/", shipment);
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const getShipmentOnChainByAddress = async (
  chainId: number,
  address: string
) => {
  try {
    console.log(address);
    console.log("🚀 ~ file: index.tsx:27 ~ /shipments/${chainId}/${address}:", `/shipments/${chainId}/${address}`);
    const path = `/shipments/${chainId}/${address}`;
    const res = await client.get(
      String(path)
    );
    return res;
  } catch (error) {
    console.error(error);
  }
};
