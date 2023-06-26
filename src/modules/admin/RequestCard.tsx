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
} from "@mui/material";
import Link from "next/link";
import useSBTContract from "../../hooks/useSBTContract";
import { useState, type ReactElement } from "react";
import { useAppSelector } from "../../redux/hooks";
import { RegisterRequest } from "../../types";
import { formatAddress } from "../../utils";
import { updateRequests } from "../../services/request";
import useRolesContract from "../../hooks/useRolesContract";

interface RequestCardProps {
	data: RegisterRequest;
	_id: string;
}

export default function RequestCard(props: RequestCardProps) {
	const { data, _id } = props;
	const [finishedStep, setFinishedStep] = useState<number>(0);
	const { signer, address, chainId } = useAppSelector((state) => state.wallet);
	const [isOpen, setOpen] = useState<boolean>(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};
	const handleConfirm = async () => {
    if(signer){
      const {issue} = useSBTContract(signer, chainId)
      const {addMember} = useRolesContract(signer, chainId)
      addMember(data.walletAddress).then((res) => {
        updateRequests(_id, "verified")
        .then((response) => {issue})
        .catch((error) => console.log(error));
  }).catch((err) => {})

    }
    
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
					<Typography variant="h6">{data.companyName}</Typography>
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						mt={1}
					>
						<Stack direction="row" alignItems="center">
							<Typography variant="h6">
								{formatAddress(data.walletAddress, 6)}
							</Typography>
							{/* <Typography
										color="textSecondary"
										ml={1}
										sx={{ textDecoration: "line-through" }}
									>
										HIHIIH
									</Typography> */}
						</Stack>
						{/* <Rating name="read-only" size="small" value={2} readOnly /> */}
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
					<Typography variant="subtitle1" fontWeight={600} mb="5px">
						<span style={{ fontWeight: 600 }}>Description: </span>
						{data.description}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" color="error">
						Decline
					</Button>
					<Button variant="contained" onClick={handleConfirm}>
						Confirm
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
