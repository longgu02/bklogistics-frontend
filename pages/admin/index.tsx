import { useState, useEffect, type ReactElement } from "react";
import {
	Grid,
	Box,
	Card,
	Typography,
	Stack,
	TextField,
	Container,
	Paper,
	Rating,
	CardContent,
	Tooltip,
	Fab,
	CardActions,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
} from "@mui/material";
import Link from "next/link";
import PageContainer from "../../src/components/container/PageContainer";
import Logo from "../../src/layouts/full/shared/logo/Logo";
import BlankLayout from "../../src/layouts/blank/BlankLayout";
import CustomStepper from "../../src/components/stepper";
import RegisterFirstStep from "../../src/modules/register/RegisterFirstStep";
import RegisterSecondStep from "../../src/modules/register/RegisterSecondStep";
import RegisterThirdStep from "../../src/modules/register/RegisterThirdStep";
import { useAppSelector } from "../../src/redux/hooks";
import FullLayout from "../../src/layouts/full/FullLayout";
import { IconBasket } from "@tabler/icons-react";
import BlankCard from "../../src/components/shared/BlankCard";
import Image from "next/image";
import img1 from "public/images/products/s4.jpg";
import useSBTContract from "../../src/hooks/useSBTContract";
import RequestCard from "../../src/modules/admin/RequestCard";
import { getPendingRequests, getRequests } from "../../src/services/request";
import WalletRequired from "../../src/layouts/full/auth/WalletRequired";
import useRolesContract from "../../src/hooks/useRolesContract";

const Register = () => {
	const [finishedStep, setFinishedStep] = useState<number>(0);
	const { signer, address, chainId, isAdmin } = useAppSelector(
		(state) => state.wallet
	);
	const [requests, setRequests] = useState([]);
	const [isOpen, setOpen] = useState<boolean>(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const handleConfirm = async () => {
		if (signer) {
			const { issue } = useSBTContract(signer, chainId);
			await issue("0xA10cF1b64fAFCD75ED18A905F96408f38f570fa6")
				.then((res) => {
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	};

	const handleAddCarrier = () => {
		if (signer) {
			const { contract, addCarrier } = useRolesContract(signer, chainId);
			addCarrier("0x32a51182E649f974a8e4749b4bDCc2A320A995E3")
				.then((res) => {
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	};

	useEffect(() => {
		getPendingRequests()
			.then((res) => setRequests(res.requests))
			.catch((err) => console.log(err));
	}, []);

	return (
		<PageContainer title="Register" description="this is Register page">
			{isAdmin ? (
				<Grid container>
					{requests &&
						requests.map((request: any) => (
							<Grid item xs={3} p={1}>
								<RequestCard _id={request._id} data={request} />
							</Grid>
						))}
				</Grid>
			) : (
				<Typography variant="h4" sx={{ textAlign: "center", mb: 2 }}>
					This feature is only available for Admin
				</Typography>
			)}
		</PageContainer>
	);
};

export default Register;

Register.getLayout = function getLayout(page: ReactElement) {
	return (
		<FullLayout>
			<WalletRequired>{page}</WalletRequired>
		</FullLayout>
	);
};
