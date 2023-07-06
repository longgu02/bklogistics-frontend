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
    const res = await client.post("/shipments/", shipment );
    return res;
  } catch (error) {
    console.error(error);
  }
};
