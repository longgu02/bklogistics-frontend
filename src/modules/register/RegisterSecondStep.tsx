import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import Link from "next/link";
import BaseStepper from "../../components/stepper/BaseStepper";
import { useAppDispatch } from "../../redux/hooks";
import {
	ContactInfo,
	updateSecondStep,
} from "../../redux/authentication/registerSlice";
import { useImmer } from "use-immer";
import { nextStep } from "../../redux/order/orderCreateSlice";
import { useEffect, useRef } from "react";

interface RegisterFirstStepProps {
	isBlur?: boolean;
	isDone: boolean;
}

interface ErrorContactInfo {
	email?: string;
	phoneNumber?: string;
	website?: string;
	deliveryAddress?: string;
	shippingAddress?: string;
}

export default function RegisterSecondStep(props: RegisterFirstStepProps) {
	const { isBlur, isDone } = props;
	const [contactInfo, setContactInfo] = useImmer<ContactInfo>({
		email: "",
		phoneNumber: "",
		website: "",
		deliveryAddress: "",
		shippingAddress: "",
	});
	const [error, setError] = useImmer<ErrorContactInfo>({});
	const isMount = useRef(false);
	const dispatch = useAppDispatch();
	const handleConfirm = () => {
		dispatch(updateSecondStep(contactInfo));
	};

	useEffect(() => {
		if (!isBlur && !isDone) {
			Object.keys(contactInfo).map((key) => {
				if (
					typeof contactInfo[key as keyof ContactInfo] === undefined ||
					contactInfo[key as keyof ContactInfo].trim() === ""
				) {
					setError((draft) => {
						draft[
							key as keyof ErrorContactInfo
						] = `Please fill in the text field`;
					});
				} else {
					setError((draft) => {
						draft[key as keyof ErrorContactInfo] = undefined;
					});
				}
			});
		}
	}, [contactInfo]);

	return (
		<BaseStepper
			isDisabled={
				Object.keys(contactInfo).some(
					(key) => error[key as keyof ErrorContactInfo] !== undefined
				) || isDone
			}
			isBlur={isBlur}
			handleConfirm={handleConfirm}
			isDone={isDone}
		>
			<Box>
				<Stack mb={3}>
					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="name"
						mb="5px"
					>
						Email
					</Typography>
					<CustomTextField
						id="email"
						variant="outlined"
						fullWidth
						value={contactInfo.email}
						onChange={(e: any) =>
							setContactInfo((draft) => {
								draft.email = e.target.value;
							})
						}
						sx={{ cursor: isBlur || isDone ? "not-allowed" : "none" }}
						helperText={error.email}
						error={error.email}
						disabled={isBlur || isDone}
					/>

					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="email"
						mb="5px"
						mt="25px"
					>
						Phone Number
					</Typography>
					<CustomTextField
						id="phone"
						variant="outlined"
						fullWidth
						value={contactInfo.phoneNumber}
						onChange={(e: any) =>
							setContactInfo((draft) => {
								draft.phoneNumber = e.target.value;
							})
						}
						sx={{ cursor: isBlur || isDone ? "not-allowed" : "none" }}
						helperText={error.phoneNumber}
						error={error.phoneNumber}
						disabled={isBlur || isDone}
					/>

					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="password"
						mb="5px"
						mt="25px"
					>
						Website (optional)
					</Typography>
					<CustomTextField
						id="website"
						variant="outlined"
						fullWidth
						value={contactInfo.website}
						onChange={(e: any) =>
							setContactInfo((draft) => {
								draft.website = e.target.value;
							})
						}
						sx={{ cursor: isBlur || isDone ? "not-allowed" : "none" }}
						helperText={error.website}
						error={error.website}
						disabled={isBlur || isDone}
					/>
					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="password"
						mb="5px"
						mt="25px"
					>
						Delivery Address
					</Typography>
					<CustomTextField
						id="delivery-address"
						variant="outlined"
						fullWidth
						value={contactInfo.deliveryAddress}
						onChange={(e: any) =>
							setContactInfo((draft) => {
								draft.deliveryAddress = e.target.value;
							})
						}
						helperText={error.deliveryAddress}
						error={error.deliveryAddress}
						sx={{ cursor: isBlur || isDone ? "not-allowed" : "none" }}
						disabled={isBlur || isDone}
					/>
					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="password"
						mb="5px"
						mt="25px"
					>
						Shipping Address
					</Typography>
					<CustomTextField
						id="shipping-address"
						variant="outlined"
						fullWidth
						value={contactInfo.shippingAddress}
						onChange={(e: any) =>
							setContactInfo((draft) => {
								draft.shippingAddress = e.target.value;
							})
						}
						helperText={error.shippingAddress}
						error={error.shippingAddress}
						sx={{ cursor: isBlur || isDone ? "not-allowed" : "none" }}
						disabled={isBlur || isDone}
					/>
				</Stack>
			</Box>
		</BaseStepper>
	);
}
