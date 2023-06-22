require("dotenv").config();
import { createReadStream, readFileSync } from "fs";
import formidable from "formidable";
import ImgurClient from "imgur";
import image from "./test.png";

export default async function imgur(req: any, res: any) {
	const client = new ImgurClient({
		clientId: process.env.IMGUR_CLIENT_ID,
		clientSecret: process.env.IMGUR_CLIENT_SECRET,
		refreshToken: process.env.IMGUR_REFRESH_TOKEN,
	});
	await client
		.upload({ image: req.body.image, type: "base64" })
		.then((response) => {
			console.log(response);
			return res
				.status(200)
				.json({ message: "Successful", imageURL: response.data.link });
		})
		.catch((err) => {
			console.log(err);
			return res
				.status(400)
				.json({ message: "error", body: req.body, error: err.message });
		});
	console.log(req);

	// const base64Image = imageBuffer.toString("base64");
	// await client
	// 	.upload({
	// 		// image: req.body.data,
	// 		image:
	// 			"C:/Users/ADMIN/Desktop/Class material/20222/BKLogistics/frontend/package/pages/api/test.png",
	// 		// type: "stream",
	// 	})
	// 	.then((response) => {
	// 		console.log(response.data);
	// 		return res.status(200).json(response.data);
	// 	})
	// 	.catch((err) => {
	// 		return res.status(400).json(err);
	// 	});
	// const form = new formidable.IncomingForm();
	// form.parse(req, async function (err, fields, files) {
	// 	return res.status(200).json({ message: "test", body: files.file });
	// });
}
