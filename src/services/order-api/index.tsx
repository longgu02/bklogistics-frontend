import axios from 'axios';
import {client} from '../client'
export const getOrders = async () => {
  try {
    const response = await client.get("/orders");
    return response;
  } catch (error) {
    console.error(error);
  }
};
