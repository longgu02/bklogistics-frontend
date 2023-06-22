import axios from "axios";
import { testClient } from "../client";

interface SendRequestBody {
	companyName: string;
	walletAddress: string;
	email: string;
	phone: string;
	website: string;
	deliveryAddress: string;
	shippingAddress: string;
	image: string;
	description: string;
	haveSBT: boolean;
	chainId: Number;
}

export const sendRequest = async (body: SendRequestBody) => {
	try {
		const response = await testClient.post("/request", {
			companyName: body.companyName,
			walletAddress: body.walletAddress,
			email: body.email,
			phoneNumber: body.phone,
			website: body.website,
			deliveryAddress: body.deliveryAddress,
			shippingAddress: body.shippingAddress,
			profileImage: body.image,
			description: body.description,
			haveSBT: body.haveSBT,
			chainId: body.chainId,
		});
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const getRequests = async () => {
	try {
		const response = await testClient.get("/request");
		return response;
	} catch (err) {
		console.error(err);
	}
};
