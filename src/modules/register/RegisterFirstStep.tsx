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
import { useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../redux/hooks";
import { useAppSelector } from "../../redux/hooks";
import { updateFirstStep } from "../../redux/authentication/registerSlice";
import { ethers } from "ethers";
import { nextStep } from "../../redux/order/orderCreateSlice";
import { useImmer } from "use-immer";

interface RegisterFirstStepProps {
	isBlur?: boolean;
	isDone: boolean;
}

export default function RegisterFirstStep(props: RegisterFirstStepProps) {
	const { isBlur, isDone } = props;
	const { address } = useAppSelector((state) => state.wallet);
	const [companyName, setCompanyName] = useState<string>("");
	const [isValid, setValid] = useState<boolean>(false);
	const [error, setError] = useImmer<{
		companyName?: String;
		registerAddress?: String;
	}>({});
	const [registerAddress, setAddress] = useState<string>(address);
	const dispatch = useAppDispatch();
	const isMount = useRef<boolean>(false);

	const handleConfirm = () => {
		dispatch(
			updateFirstStep({
				companyName: companyName,
				walletAddress: registerAddress,
			})
		);
	};

	useEffect(() => {
		if (isMount.current == true) {
			if (typeof companyName === undefined || companyName.trim() === "") {
				setError((draft) => {
					draft.companyName = "Please fill in your company name.";
				});
				setValid(false);
			} else {
				setError((draft) => {
					draft.companyName = undefined;
				});
			}
			if (typeof registerAddress === undefined) {
				setError((draft) => {
					draft.registerAddress = "Please fill in your wallet address.";
				});
				setValid(false);
			} else if (!ethers.isAddress(registerAddress)) {
				setError((draft) => {
					draft.registerAddress = "Address format is not valid.";
				});
				setValid(false);
			} else {
				setError((draft) => {
					draft.registerAddress = undefined;
				});
			}
		} else {
			isMount.current = true;
		}
	}, [companyName, registerAddress]);

	return (
		<BaseStepper
			isDisabled={
				isDone ||
				!(
					error.companyName == undefined && error.registerAddress == undefined
				) ||
				!isMount.current
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
						helperText={error.companyName}
						error={error.companyName}
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
						helperText={error.registerAddress}
						error={error.registerAddress}
						fullWidth
					/>
				</Stack>
				<Link href="/register/sbt"> Already minted SBT on other network?</Link>
			</Box>
		</BaseStepper>
	);
}
