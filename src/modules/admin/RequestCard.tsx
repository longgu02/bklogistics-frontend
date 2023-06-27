import Image from "next/image";
import TypographyPage from "../../../pages/utilities/typography";
import BlankCard from "../../components/shared/BlankCard";
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
	CircularProgress,
} from "@mui/material";
import Link from "next/link";
import useSBTContract from "../../hooks/useSBTContract";
import { useState, type ReactElement } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RegisterRequest } from "../../types";
import { formatAddress } from "../../utils";
import { updateRequests } from "../../services/request";
import useRolesContract from "../../hooks/useRolesContract";
import useNotify from "../../hooks/useNotify";
import { createProfile } from "../../services/profile-api";

interface RequestCardProps {
	data: RegisterRequest;
	_id: string;
}

export default function RequestCard(props: RequestCardProps) {
	const { data, _id } = props;
	const [finishedStep, setFinishedStep] = useState<number>(0);
	const { signer, address, chainId } = useAppSelector((state) => state.wallet);
	const [isOpen, setOpen] = useState<boolean>(false);
	const [isLoadingConfirm, setLoadingConfirm] = useState<boolean>(false);
	const [isLoadingDecline, setLoadingDecline] = useState<boolean>(false);
	const { errorNotify, successNotify, infoNotify } = useNotify();
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const handleConfirm = async () => {
		if (signer) {
			setLoadingConfirm(true);
			const { issue, contract: SBTContract } = useSBTContract(signer, chainId);
			const { addMember, contract: roleContract } = useRolesContract(
				signer,
				chainId
			);
			addMember(data.walletAddress)
				.then((res) => {
					roleContract.on("MemberAdded", () => {
						successNotify(
							`Member ${formatAddress(data.walletAddress, 3)} Added`
						);
						roleContract.removeAllListeners();
					});
					updateRequests(_id, "verified")
						.then((response) => {
							createProfile({
								walletAddress: data.walletAddress,
								companyName: data.companyName,
								profileImage: data.profileImage,
								description: data.description,
								currentStep: data.currentStep,
								email: data.email,
								phoneNumber: data.phoneNumber,
								website: data.website,
								chainId: data.chainId || "5",
								deliveryAddress: data.deliveryAddress,
								shippingAddress: data.shippingAddress,
							});
							issue(data.walletAddress);
							SBTContract.on("Issue", () => {
								successNotify(
									`Issued Soulbound Token for ${formatAddress(
										data.walletAddress,
										3
									)}`
								);
								SBTContract.removeAllListeners();
								setLoadingConfirm(false);
							})
								.then((issueRes) => {
									successNotify(
										`Request of ${formatAddress(
											data.walletAddress,
											3
										)} Approved`
									);
								})
								.catch((error) => {
									console.log(error);
									errorNotify(`Error: ${error.message}`);
									setLoadingConfirm(false);
								});
						})
						.catch((error) => {
							console.log(error);
							setLoadingConfirm(false);
						});
				})
				.catch((err) => {
					errorNotify(`Error: ${err.message}`);
					setLoadingConfirm(false);
				});
			// setLoadingConfirm(false);
		}
	};

	const handleDecline = async () => {
		setLoadingDecline(true);
		updateRequests(_id, "rejected")
			.then((response) => {
				infoNotify(
					`Request of ${formatAddress(data.walletAddress, 3)} Rejected`
				);
			})
			.catch((error) => {
				errorNotify(`Error: ${error.message}`);
			});
		setLoadingDecline(false);
	};
	return (
		<>
			<BlankCard>
				<Typography component={Link} href="/">
					<Image
						src={data.profileImage || "https://i.imgur.com/EYrkDIP"}
						alt="img"
						width={250}
						height={250}
					/>
				</Typography>
				<CardContent sx={{ p: 3, pt: 2 }}>
					<Typography variant="h6" mb="5px">
						{data.companyName}
					</Typography>
					<Stack direction="column">
						<Typography variant="subtitle1" mb="5px">
							<span style={{ fontWeight: 600 }}>Address: </span>
							{formatAddress(data.walletAddress, 6)}
						</Typography>
						<Typography variant="subtitle1" mb="5px">
							<span style={{ fontWeight: 600 }}>Network ID: </span>
							{data.chainId || 5}
						</Typography>
					</Stack>
				</CardContent>
				<CardActions>
					<Button
						variant="contained"
						onClick={handleOpen}
						sx={{ ml: "auto", mr: "auto" }}
					>
						Verify
					</Button>
				</CardActions>
			</BlankCard>
			<Dialog onClose={handleClose} open={isOpen} fullWidth>
				<DialogTitle>Information</DialogTitle>
				<DialogContent>
					<Typography variant="subtitle1" mb="5px">
						<span style={{ fontWeight: 600 }}>Company Name: </span>
						{data.companyName}
					</Typography>
					<Typography variant="subtitle1" mb="5px">
						<span style={{ fontWeight: 600 }}>Address: </span>
						{data.walletAddress}
					</Typography>
					<Grid container>
						<Grid item xs={6}>
							<Typography variant="subtitle1" mb="5px">
								<span style={{ fontWeight: 600 }}>Email: </span>
								{data.email}
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="subtitle1" mb="5px">
								<span style={{ fontWeight: 600 }}>Tel: </span>
								{data.phoneNumber}
							</Typography>
						</Grid>
					</Grid>
					<Typography variant="subtitle1" mb="5px">
						<span style={{ fontWeight: 600 }}>Delivery Address: </span>
						{data.deliveryAddress}
					</Typography>
					<Typography variant="subtitle1" mb="5px">
						<span style={{ fontWeight: 600 }}>Shipping Address: </span>
						{data.shippingAddress}
					</Typography>
					<Typography variant="subtitle1" mb="5px">
						<span style={{ fontWeight: 600 }}>Description: </span>
						{data.description}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button
						variant="contained"
						color="error"
						onClick={handleDecline}
						disabled={isLoadingDecline}
					>
						{isLoadingDecline && <CircularProgress size={25} sx={{ mr: 1 }} />}
						Decline
					</Button>
					<Button
						variant="contained"
						onClick={handleConfirm}
						disabled={isLoadingConfirm}
					>
						{isLoadingConfirm && <CircularProgress size={25} sx={{ mr: 1 }} />}
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
