import axios from "axios";
import { testClient, client } from "../client";
import { PricingType } from "../../hooks/usePricingContract";

interface CreateProfileBody {
  walletAddress: string;
  companyName: string;
  profileImage: string;
  description: string;
  currentStep: number;
  email: string;
  phoneNumber: string;
  website: string;
  chainId: string;
  deliveryAddress: string;
  shippingAddress: string;
}

export const createProfile = async (body: CreateProfileBody) => {
  const response = await testClient.post("/profiles", body);
  return response;
};

export const getProfile = async (address: string) => {
  const response = await testClient.get(`/profiles/address/${address}`);
  return response;
};

export const getListed = async (address: string) => {
  const response = await testClient.get(`/profiles/${address}/list`);
  return response;
};

export const addListed = async (
  address: string,
  productId: number,
  type: PricingType
) => {
  let body: { productId?: number; materialId?: number } = {};
  console.log(body);
  if (type == PricingType.PRODUCT) {
    body.productId = productId;
  }
  if (type == PricingType.MATERIAL) {
    body.materialId = productId;
  }
  const response = await testClient.put(`/profiles/${address}/list`, body);
  return response;
};

export const getSuppliersByMaterialId = async (materialId: number) => {
  const response = await client.get(`/profiles/${materialId}/suppliers`);
  return response;
};

export const getManufacturersByProductId = async (productId: number) => {
  const response = await client.get(`/profiles/${productId}/manufacturers`);
  return response;
};
