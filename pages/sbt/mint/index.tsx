// require("dotenv").config;
import type { ReactElement } from "react";
import { useEffect, useState } from "react";
import {
	Grid,
	Box,
	Card,
	Typography,
	Stack,
	Select,
	MenuItem,
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	CircularProgress,
} from "@mui/material";
import Link from "next/link";
import PageContainer from "../../../src/components/container/PageContainer";
import Logo from "../../../src/layouts/full/shared/logo/Logo";
import BlankLayout from "../../../src/layouts/blank/BlankLayout";
import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";
import { getCID } from "../../../src/services/pinata-api";
import useSBTContract from "../../../src/hooks/useSBTContract";
import { useAppSelector } from "../../../src/redux/hooks";
import { getNetworkAddress } from "../../../src/constants/address";
import { getProfile } from "../../../src/services/profile-api";
import { Profile } from "../../../src/types";
import HeaderLayout from "../../../src/layouts/header/HeaderLayout";

const Register2 = () => {
	const [network, setNetwork] = useState<Number>(5);
	const [issuer, setIssuer] = useState<String>("BKLogistics");
	const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
	const [profile, setProfile] = useState<Profile>();

	const { signer, address, chainId } = useAppSelector((state) => state.wallet);
	const handleMint = () => {
		if (signer) {
			const info = {
				companyName: "Bracalente Manufacturing Co, Inc.",
				email: "info@bracalente.com",
				phone: "0123456789",
				website: "https://www.bracalente.com/",
				image: "https://i.imgur.com/vxhgnye.jpg",
				description:
					"Bracalente Mfg. Group has been serving the outsourced precision parts needs of all industries since 1950. We are a machine shop that specializes in the precision parts requirements of our customers. Our knowledgeable machine shop staff along with our qualified quality control staff assures that products are made to your specifications.",
			};
			getCID(info)
				.then((res) => {
					console.log(res);
					const { claimSBT } = useSBTContract(signer, chainId);
					claimSBT(res.cid);
					setDialogOpen(true);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	};

	useEffect(() => {
		if (address) {
			getProfile(address)
				.then((response) => {
					console.log(response);
					setProfile(response.profile);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, [address]);

	return (
		<PageContainer title="Register" description="this is Register page">
			{profile ? (
				<Box>
					<Box
						sx={{
							position: "relative",
							"&:before": {
								content: '""',
								background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
								backgroundSize: "400% 400%",
								animation: "gradient 15s ease infinite",
								position: "absolute",
								height: "100%",
								width: "100%",
								opacity: "0.3",
							},
						}}
					>
						<Grid
							container
							spacing={0}
							justifyContent="center"
							sx={{ height: "100vh" }}
						>
							<Grid
								item
								xs={12}
								sm={12}
								lg={4}
								xl={3}
								display="flex"
								justifyContent="center"
								alignItems="center"
							>
								<Card
									elevation={9}
									sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
								>
									<Box
										display="flex"
										alignItems="center"
										justifyContent="center"
									>
										<Logo />
									</Box>
									<Typography
										fontWeight="700"
										variant="h4"
										mb={1}
										sx={{ textAlign: "center", mb: 2 }}
									>
										Mint BKLogistics Soulbound Token
									</Typography>
									<Box>
										<Stack mb={3}>
											<Typography variant="subtitle1" mb="5px">
												<span style={{ fontWeight: 600 }}>Company Name: </span>
												{profile.companyName}
											</Typography>
											<Typography variant="subtitle1" mb="5px">
												<span style={{ fontWeight: 600 }}>Address: </span>
												{address}
											</Typography>
											<Grid container>
												<Grid item xs={6}>
													<Typography variant="subtitle1" mb="5px">
														<span style={{ fontWeight: 600 }}>Email: </span>
														{profile.email}
													</Typography>
												</Grid>
												<Grid item xs={6}>
													<Typography variant="subtitle1" mb="5px">
														<span style={{ fontWeight: 600 }}>Tel: </span>
														{profile.phoneNumber}
													</Typography>
												</Grid>
											</Grid>
											<Typography variant="subtitle1" mb="5px">
												<span style={{ fontWeight: 600 }}>
													Delivery Address:{" "}
												</span>
												{profile.deliveryAddress}
											</Typography>
											<Typography variant="subtitle1" mb="5px">
												<span style={{ fontWeight: 600 }}>
													Shipping Address:{" "}
												</span>
												{profile.shippingAddress}
											</Typography>
											<Typography variant="subtitle1" mb="5px">
												<span style={{ fontWeight: 600 }}>Description: </span>
												{profile.description}
											</Typography>
										</Stack>
										<Button
											color="primary"
											variant="contained"
											size="large"
											fullWidth
											onClick={handleMint}
										>
											Mint
										</Button>
									</Box>
								</Card>
							</Grid>
						</Grid>
					</Box>
					<Dialog
						onClose={() => setDialogOpen(false)}
						open={isDialogOpen}
						fullWidth
					>
						<DialogTitle>Information</DialogTitle>
						<DialogContent>
							<Typography variant="subtitle1" mb="5px">
								<span style={{ fontWeight: 600 }}>
									Your Soulbound Token ID:{" "}
								</span>
								1
							</Typography>
							<Typography variant="subtitle1" mb="5px">
								<span style={{ fontWeight: 600 }}>Network: </span>1
							</Typography>
							<Link
								href={`https://testnets.opensea.io/assets/goerli/${
									getNetworkAddress(chainId).SBT_CONTRACT_ADDRESS
								}/${1}`}
							></Link>
							{/* <Typography variant="subtitle1" mb="5px">
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
					</Typography> */}
						</DialogContent>
						<DialogActions>
							<Button variant="contained">Confirm</Button>
						</DialogActions>
					</Dialog>
				</Box>
			) : (
				<CircularProgress />
			)}
		</PageContainer>
	);
};

export default Register2;

Register2.getLayout = function getLayout(page: ReactElement) {
	return <HeaderLayout>{page}</HeaderLayout>;
};
