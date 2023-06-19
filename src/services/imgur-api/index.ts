import axios from "axios";
import { nextClient } from "../client";
import { ReadableStream } from "stream/web";
// const pinataClient = client("/api/pinata");

export async function uploadImgur(image: any) {
	const formData = new FormData();
	formData.append("file", image);
	try {
		console.log(formData);
		const response = await nextClient.post("/api/imgur", formData);
		return response;
	} catch (error) {
		console.error(error);
	}
}
