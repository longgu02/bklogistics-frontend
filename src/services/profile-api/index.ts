import axios from "axios";
import { testClient } from "../client";

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
