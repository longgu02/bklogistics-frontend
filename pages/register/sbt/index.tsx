import type { ReactElement } from "react";
import { useState } from "react";
import {
	Grid,
	Box,
	Card,
	Typography,
	Stack,
	Select,
	MenuItem,
	Button,
} from "@mui/material";
import Link from "next/link";
import PageContainer from "../../../src/components/container/PageContainer";
import Logo from "../../../src/layouts/full/shared/logo/Logo";
import BlankLayout from "../../../src/layouts/blank/BlankLayout";
import CustomTextField from "../../../src/components/forms/theme-elements/CustomTextField";

const Register2 = () => {
	const [network, setNetwork] = useState<Number>(5);
	const [issuer, setIssuer] = useState<String>("BKLogistics");
	return (
		<PageContainer title="Register" description="this is Register page">
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
							<Box display="flex" alignItems="center" justifyContent="center">
								<Logo />
							</Box>
							<Typography
								fontWeight="700"
								variant="h4"
								mb={1}
								sx={{ textAlign: "center", mb: 2 }}
							>
								KYC by Minted Soulbound Token
							</Typography>
							<Box>
								<Stack mb={3}>
									<Typography
										variant="subtitle1"
										fontWeight={600}
										component="label"
										htmlFor="address"
										mb="5px"
									>
										Wallet Address
									</Typography>
									<CustomTextField
										type="address"
										variant="outlined"
										fullWidth
									/>
									<Typography
										variant="subtitle1"
										fontWeight={600}
										component="label"
										htmlFor="name"
										mt="25px"
										mb="5px"
									>
										Network
									</Typography>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={network}
										label="Network"
										onChange={(e) => setNetwork(Number(e.target.value))}
									>
										<MenuItem value={5}>Goerli Testnet</MenuItem>
										<MenuItem value={11155111}>Sepolia Testnet</MenuItem>
										<MenuItem value={97}>BSC Testnet</MenuItem>
									</Select>
									<Typography
										variant="subtitle1"
										fontWeight={600}
										component="label"
										htmlFor="name"
										mt="25px"
										mb="5px"
									>
										Issued by
									</Typography>
									<Select
										labelId="demo-simple-select-label"
										id="demo-simple-select"
										value={issuer}
										label="Network"
										onChange={(e) => setIssuer(e.target.value)}
									>
										<MenuItem value={"BKLogistics"}>BKLogistics</MenuItem>
										<MenuItem value={"Other"}>Other</MenuItem>
									</Select>
								</Stack>
								<Button
									color="primary"
									variant="contained"
									size="large"
									fullWidth
									component={Link}
									href="/authentication/login"
								>
									Register
								</Button>
							</Box>
						</Card>
					</Grid>
				</Grid>
			</Box>
		</PageContainer>
	);
};

export default Register2;

Register2.getLayout = function getLayout(page: ReactElement) {
	return <BlankLayout>{page}</BlankLayout>;
};
