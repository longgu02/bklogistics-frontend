import axios from "axios";
import { nextClient } from "../client";
// const pinataClient = client("/api/pinata");
interface getCIDBody {
	companyName: string;
	email: string;
	phone: string;
	website: string;
	image: string;
	description: string;
}

export const getCID = async (body: getCIDBody) => {
	try {
		const response = await nextClient.post("/api/pinata", { data: body });
		return response;
	} catch (error) {
		console.error(error);
	}
};
