import { useState, type ReactElement } from "react";
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

const Register = () => {
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
		if (signer) {
			const { issue } = useSBTContract(signer, chainId);
			await issue("0xA10cF1b64fAFCD75ED18A905F96408f38f570fa6")
				.then((res) => {
					console.log(res);
				})
				.catch((err) => console.log(err));
		}
	};
	return (
		<PageContainer title="Register" description="this is Register page">
			<Grid container>
				<Grid item xs={3}>
					<BlankCard>
						<Typography component={Link} href="/">
							<Image
								src={img1}
								alt="img"
								style={{ width: "100%", height: "250px" }}
							/>
						</Typography>
						{/* <Tooltip title="Add To Cart">
							<Fab
								size="small"
								color="primary"
								sx={{ bottom: "75px", right: "15px", position: "absolute" }}
							>
								<IconBasket size="16" />
							</Fab>
						</Tooltip> */}
						<CardContent sx={{ p: 3, pt: 2 }}>
							<Typography variant="h6">Company name</Typography>
							<Stack
								direction="row"
								alignItems="center"
								justifyContent="space-between"
								mt={1}
							>
								<Stack direction="row" alignItems="center">
									<Typography variant="h6">Address</Typography>
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
				</Grid>
			</Grid>
			<Dialog onClose={handleClose} open={isOpen} fullWidth>
				<DialogTitle>Information</DialogTitle>
				<DialogContent>
					<Typography variant="subtitle1" mb="5px">
						<span style={{ fontWeight: 600 }}>Company Name: </span>
						Cong ty TNHH mot minh tao
					</Typography>
					<Typography variant="subtitle1" fontWeight={600} mb="5px">
						<span style={{ fontWeight: 600 }}>Address: </span>
					</Typography>
					<Grid container>
						<Grid item xs={6}>
							<Typography variant="subtitle1" fontWeight={600} mb="5px">
								<span style={{ fontWeight: 600 }}>Email: </span>
							</Typography>
						</Grid>
						<Grid item xs={6}>
							<Typography variant="subtitle1" fontWeight={600} mb="5px">
								<span style={{ fontWeight: 600 }}>Tel: </span>
							</Typography>
						</Grid>
					</Grid>
					<Typography variant="subtitle1" fontWeight={600} mb="5px">
						<span style={{ fontWeight: 600 }}>Delivery Address: </span>
					</Typography>
					<Typography variant="subtitle1" fontWeight={600} mb="5px">
						<span style={{ fontWeight: 600 }}>Shipping Address: </span>
					</Typography>
					<Typography variant="subtitle1" fontWeight={600} mb="5px">
						<span style={{ fontWeight: 600 }}>Description: </span>
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
		</PageContainer>
	);
};

export default Register;

Register.getLayout = function getLayout(page: ReactElement) {
	return <FullLayout>{page}</FullLayout>;
};
