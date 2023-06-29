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
import { useAppSelector } from "../../redux/hooks";
import { useImmer } from "use-immer";
import { useEffect, useState } from "react";
import { uploadImgur } from "../../services/imgur-api";
import {
	convertBase64,
	ethersAuthenticate,
	getNonce,
	storeJWT,
} from "../../utils";
import { sendRequest } from "../../services/request";
import { updateAdmin, updateJWT } from "../../redux/connection/walletSlice";
import { checkAdmin, login } from "../../services/auth";
import useNotify, { errorNotify } from "../../hooks/useNotify";
import { redirect } from "next/dist/server/api-utils";
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
	image?: any;
	description?: string;
}

export default function RegisterThirdStep(props: RegisterFirstStepProps) {
	const { isBlur, isDone } = props;
	const [isLoading, setLoading] = useState<boolean>(false);
	const [additionalInfo, setAdditionalInfo] = useImmer<AdditionalInfo>({
		image: "",
		description: "",
	});
	const {
		walletAddress,
		companyName,
		email,
		phoneNumber,
		website,
		deliveryAddress,
		shippingAddress,
		image,
		description,
	} = useAppSelector((state) => state.register);
	const { chainId, address, signer } = useAppSelector((state) => state.wallet);
	const { successNotify, errorNotify } = useNotify();
	const [error, setError] = useImmer<ErrorAdditionalInfo>({});
	const dispatch = useAppDispatch();

	const authenticate = async () => {
		const nonce = getNonce();
		if (signer) {
			const signature = await ethersAuthenticate(
				`I am signing my one time nonce:${nonce}`,
				signer
			);
			login({
				signature: signature.message,
				nonce: nonce,
				walletAddress: address,
			})
				.then((res) => {
					dispatch(updateJWT(res.jwt));
					storeJWT(address, res.jwt);
					checkAdmin(res.jwt)
						.then((response) => {
							dispatch(updateAdmin(response.isAdmin));
						})
						.catch((err) => {
							console.log(err);
						});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	const handleConfirm = async () => {
		setLoading(true);
		await uploadImgur(additionalInfo.image)
			.then(async (res) => {
				console.log(res);
				dispatch(
					updateThirdStep({
						description: additionalInfo.description,
						image: res.imageURL,
					})
				);
				await authenticate();
				await sendRequest({
					companyName: companyName,
					walletAddress: walletAddress,
					email: email,
					phone: phoneNumber,
					website: website,
					deliveryAddress: deliveryAddress,
					shippingAddress: shippingAddress,
					image: res.imageURL,
					description: additionalInfo.description,
					haveSBT: false,
					chainId: chainId,
				})
					.then((res) => {
						successNotify(
							"Register request sent! Your request will be reviewed in 3 days"
						);
					})
					.catch((err) => {
						errorNotify("Error Occured: " + err.message);
						console.log(err);
					});
			})
			.catch((err) => {
				console.log(err);
			});
		setLoading(false);
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

	const upload = async (e: any) => {
		const file = e.target.files[0];
		const base64 = await convertBase64(file);
		setAdditionalInfo((draft) => {
			draft.image = base64;
		});
	};

	return (
		<BaseStepper
			isDisabled={
				Object.keys(additionalInfo).some(
					(key) => error[key as keyof ErrorAdditionalInfo] !== undefined
				) || isDone
			}
			isLoading={isLoading}
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
					<input
						accept="image/*"
						// style={{ display: "none" }}
						id="file-input"
						// multiple
						type="file"
						onChange={(e) => upload(e)}
						// hidden
					/>
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
