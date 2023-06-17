import {
	Box,
	Button,
	Grid,
	Paper,
	Select,
	Stack,
	Switch,
	Typography,
	MenuItem,
} from "@mui/material";
import CustomTextField from "../../components/forms/theme-elements/CustomTextField";
import Link from "next/link";
import BaseStepper from "../../components/stepper/BaseStepper";
import { useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useAppSelector } from "../../redux/hooks";
import { updateFirstStep } from "../../redux/authentication/registerSlice";
import { ethers } from "ethers";
import { nextStep } from "../../redux/order/orderCreateSlice";

interface RegisterFirstStepProps {
	isBlur?: boolean;
	isDone: boolean;
}

export default function RegisterFirstStep(props: RegisterFirstStepProps) {
	const { isBlur, isDone } = props;
	const { address } = useAppSelector((state) => state.wallet);
	const [companyName, setCompanyName] = useState<string>("");
	const [registerAddress, setAddress] = useState<string>(address);
	const dispatch = useAppDispatch();

	const handleConfirm = () => {
		dispatch(
			updateFirstStep({
				companyName: companyName,
				walletAddress: registerAddress,
			})
		);
	};

	// console.log(address, "is address: ", ethers.isAddress(address));
	return (
		<BaseStepper
			isDisabled={
				typeof companyName === undefined ||
				companyName == "" ||
				!ethers.isAddress(registerAddress) ||
				isDone
			}
			isDone={isDone}
			isBlur={isBlur}
			handleConfirm={handleConfirm}
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
						Company Name
					</Typography>
					<CustomTextField
						value={companyName}
						onChange={(e: any) => setCompanyName(e.target.value)}
						id="name"
						sx={{ cursor: isBlur || isDone ? "not-allowed" : "none" }}
						disabled={isBlur || isDone}
						variant="outlined"
						fullWidth
					/>

					<Typography
						variant="subtitle1"
						fontWeight={600}
						component="label"
						htmlFor="email"
						mb="5px"
						mt="25px"
					>
						Wallet Address
					</Typography>
					<CustomTextField
						value={registerAddress}
						onChange={(e: any) => setAddress(e.target.value)}
						sx={{ cursor: isBlur || isDone ? "not-allowed" : "none" }}
						disabled={isBlur || isDone}
						id="address"
						variant="outlined"
						fullWidth
					/>
				</Stack>
				<Link href="/register/sbt"> Already minted SBT on other network?</Link>
			</Box>
		</BaseStepper>
	);
}
