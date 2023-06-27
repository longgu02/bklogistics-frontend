import axios from "axios";
import { nextClient } from "../client";
import { ReadableStream } from "stream/web";
// const pinataClient = client("/api/pinata");

export async function uploadImgur(image: any) {
	image = image.replace(/^data:image\/(png|jpg|jpeg);base64,/, "");
	try {
		const response = await nextClient.post("/api/imgur", { image: image });
		return response;
	} catch (error) {
		console.error(error);
	}
}
