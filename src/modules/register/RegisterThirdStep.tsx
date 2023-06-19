require("dotenv").config;
import { Box, Button, Stack, Typography } from "@mui/material";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import Link from "next/link";
import BaseStepper from "../../components/stepper/BaseStepper";
import {
	AdditionalInfo,
	updateThirdStep,
} from "../../redux/authentication/registerSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useImmer } from "use-immer";
import { useEffect } from "react";
import { uploadImgur } from "../../services/imgur-api";
// import { imgurUpload } from "../../services/imgur";

// const imgurUpload = async () => {
// 	const fileInput = document.getElementById("file-input") as HTMLInputElement;
// 	const file = fileInput.files[0];

// 	const reader = new FileReader();
// 	reader.readAsDataURL(file);

// 	return new Promise<string>((resolve, reject) => {
// 		reader.onloadend = async () => {
// 			const base64data = reader.result?.toString();

// 			try {
// 				const response = await client.upload({
// 					image: base64data,
// 					type: "base64",
// 				});
// 				resolve(response.data.link);
// 			} catch (error) {
// 				reject(error);
// 			}
// 		};
// 		reader.onerror = reject;
// 	});
// };

interface RegisterFirstStepProps {
	isBlur?: boolean;
	isDone: boolean;
}

interface ErrorAdditionalInfo {
	profileImage?: string;
	coverImage?: string;
	description?: string;
}

export default function RegisterThirdStep(props: RegisterFirstStepProps) {
	const { isBlur, isDone } = props;
	const [additionalInfo, setAdditionalInfo] = useImmer<AdditionalInfo>({
		profileImage: "",
		coverImage: "",
		description: "",
	});

	const [error, setError] = useImmer<ErrorAdditionalInfo>({});
	const dispatch = useAppDispatch();
	const handleConfirm = () => {
		dispatch(updateThirdStep(additionalInfo));
	};

	useEffect(() => {
		if (!isBlur && !isDone) {
			if (
				additionalInfo.description.trim() === "" ||
				additionalInfo.description == undefined
			) {
				setError((draft) => {
					draft.description = "Please provide a description.";
				});
			} else {
				setError((draft) => {
					draft.description = undefined;
				});
			}
		}
	}, [additionalInfo]);

	console.log(process.env.NODE_ENV);
	const upload = async (e: any) => {
		const imageData = e.target.files[0];
		const formData = new FormData();
		formData.append("image", imageData);
		// console.log(imageData.webkitRelativePath());
		const reader = new FileReader();
		await uploadImgur(imageData)
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// const upload = (e: any) => {
	// 	const client = new ImgurClient({
	// 		clientId: process.env.CLIENT_ID,
	// 		clientSecret: process.env.CLIENT_SECRET,
	// 		refreshToken: process.env.REFRESH_TOKEN,
	// 	});
	// 	const fileInput = document.getElementById("file-input") as HTMLInputElement;
	// 	const file = e.target.value;
	// 	console.log(e.target.value);
	// 	const reader = new FileReader();
	// 	reader.readAsDataURL(file);

	// 	return new Promise<string>((resolve, reject) => {
	// 		reader.onloadend = async () => {
	// 			const base64data = reader.result?.toString();

	// 			try {
	// 				const response = await client.upload({
	// 					image: base64data,
	// 					type: "base64",
	// 				});
	// 				resolve(response.data.link);
	// 			} catch (error) {
	// 				reject(error);
	// 			}
	// 		};
	// 		reader.onerror = reject;
	// 	});
	// };

	return (
		<BaseStepper
			isDisabled={
				Object.keys(additionalInfo).some(
					(key) =>
						additionalInfo[key as keyof AdditionalInfo] === "" ||
						typeof additionalInfo[key as keyof AdditionalInfo] === "undefined"
				) || isDone
			}
			isBlur={isBlur}
			handleConfirm={handleConfirm}
			isDone={isDone}
		>
			<Box>
				<Stack mb={3}>
					{/* <Button onClick={}>Upload</Button> */}
					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="name"
						mb="5px"
					>
						Profile Image
					</Typography>
					{/* <Button variant="contained" component="label" sx={{ mb: "5px" }}>
						Upload File */}
					<input
						accept="image/*"
						// style={{ display: "none" }}
						id="file-input"
						// multiple
						type="file"
						onChange={(e) => upload(e)}
						// hidden
					/>
					{/* </Button> */}
					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="email"
						mb="5px"
						mt="25px"
					>
						Cover Image
					</Typography>
					{/* <Button variant="contained" component="label" sx={{ mb: "5px" }}>
						Upload File */}
					{/* <input type="file" hidden /> */}
					<input
						accept="image/*"
						// style={{ display: "none" }}
						id="file-input"
						// multiple
						type="file"
						onChange={(e) => upload(e)}
						// hidden
					/>

					{/* </Button> */}
					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="name"
						mb="5px"
						mt="25px"
					>
						Description
					</Typography>
					<CustomTextField
						id="Description"
						variant="outlined"
						multiline
						rows={5}
						fullWidth
						value={additionalInfo.description}
						onChange={(e: any) =>
							setAdditionalInfo((draft) => {
								draft.description = e.target.value;
							})
						}
						helperText={error.description}
						error={error.description}
						sx={{ cursor: isBlur || isDone ? "not-allowed" : "none" }}
						disabled={isBlur || isDone}
					/>
				</Stack>
			</Box>
		</BaseStepper>
	);
}
