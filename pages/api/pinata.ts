require("dotenv").config;
import PinataClient from "@pinata/sdk";

export default async function pinata(req: any, res: any) {
	if (req.body) {
		const data = {
			image: req.body.data.image,
			description: req.body.data.description,
			attributes: [
				{
					trait_type: "Company Name",
					value: req.body.data.companyName,
				},
				{
					trait_type: "Email",
					value: req.body.data.email,
				},
				{
					trait_type: "Email",
					value: req.body.data.email,
				},
				{
					trait_type: "Website",
					value: req.body.data.website,
				},
			],
		};
		const pinata = new PinataClient({
			pinataApiKey: process.env.PINATA_API_KEY,
			pinataSecretApiKey: process.env.PINATA_API_SECRET,
			pinataJWTKey: process.env.PINATA_JWT,
		});
		await pinata
			.pinJSONToIPFS(data)
			.then((response) => {
				return res
					.status(200)
					.json({ message: "test", cid: response.IpfsHash });
			})
			.catch((err) => {
				return res
					.status(400)
					.json({ message: "Error Occured", body: req.body, err: err });
			});
	} else {
		return res
			.status(400)
			.json({ message: "Request Body is not valid", body: req.body });
	}
}
