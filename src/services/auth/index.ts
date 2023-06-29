import { testClient } from "../client";

export const login = async (body: any) => {
	try {
		const response = await testClient.post("/auth/login", body);
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const checkAdmin = async (jwt: string) => {
	try {
		const response = await testClient.post("/auth/check-admin", { jwt: jwt });
		return response;
	} catch (error) {
		console.error(error);
	}
};

export const checkValidation = async (jwt: string) => {
	try {
		const response = await testClient.post("/auth/check", { jwt: jwt });
		return response;
	} catch (error) {
		console.error(error);
	}
};
