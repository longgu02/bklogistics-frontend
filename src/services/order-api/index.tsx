import axios from 'axios';

export const getOrders = async () => {
  try {
    const response = await axios.get("http://localhost:3001/api/orders");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
