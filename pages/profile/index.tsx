import { Box, Container, Typography, Grid, Card } from "@mui/material";
import FullLayout from "../../src/layouts/full/FullLayout";
import { ReactElement, useEffect, useRef, useState } from "react";
import PageContainer from "../../src/components/container/PageContainer";
import DashboardCard from "../../src/components/shared/DashboardCard";
import ProfileCover from "../../src/modules/profile/ProfileCover";
import RecentActivity from "../../src/modules/profile/RecentActivity";
import Wallets from "../../src/modules/profile/Wallets";
import Locations from "../../src/modules/profile/Locations";
import { useAppSelector } from "../../src/redux/hooks";
import useRolesContract from "../../src/hooks/useRolesContract";
import { MEMBER_ROLE } from "../../src/constants/role";
import { errorNotify } from "../../src/hooks/useNotify";
import { enqueueSnackbar } from "notistack";
// import Wallet from "../../src/modules/profile/Wallets";
import { Wallet } from "../../src/types/wallet";
const user = {
	name: "Bracalente Manufacturing Co, Inc.",
	coverImg:
		"https://img.freepik.com/premium-vector/aesthetic-pastel-gradient-blue-purple-gradient-wallpaper-illustration-perfect-backdrop-wallpaper-background-banner-cover_565280-1124.jpg",
	avatar:
		"https://media.licdn.com/dms/image/C560BAQGbtV5M4wVCbw/company-logo_200_200/0/1658174733065?e=2147483647&v=beta&t=KNJsKA_A5c6-HTmntqxVQNqu_ddwMiiZ-pXZq-HapK8",
	description:
		"Bracalente Mfg. Group has been serving the outsourced precision parts needs of all industries since 1950. We are a machine shop that specializes in the precision parts requirements of our customers. Our knowledgeable machine shop staff along with our qualified quality control staff assures that products are made to your specifications.",
	jobtitle: "Manufacturer",
	location: "Trumbauersville, PA 18970",
	followers: "465",
};

const addresses = [
	"0xF6f94b71bbdc4716dc138A04593a7fb0504F3e43",
	"0xA10cF1b64fAFCD75ED18A905F96408f38f570fa6",
	"0xe7c58E20A32B2309B18549a43E6829D1126ADa2E",
];

const ManageOrder = () => {
	const { address, chainId, signer, provider } = useAppSelector(
		(state) => state.wallet
	);
	return (
		<PageContainer title="Profile" description="this is Profile page">
			{/* <DashboardCard title="Profile">
				<Box>
					<Typography>Manage Order</Typography>
				</Box>
			</DashboardCard> */}
			<ProfileCover user={user} />
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="stretch"
				spacing={3}
			>
				{/* <Grid item xs={12} md={8}> */}
				{/* </Grid> */}
				{/* <Grid item xs={12} md={4}>
					<RecentActivity />
				</Grid> */}
				{/* <Grid item xs={12} md={8}> */}
				{/* <Feed /> */}
				{/* </Grid> */}
				{/* <Grid item xs={12} md={4}> */}
				{/* <PopularTags /> */}
				{/* </Grid> */}
				<Grid item xs={12} md={7}>
					<Wallets currentAddress={address} wallets={addresses} />
				</Grid>
				<Grid item xs={12} md={5}>
					<Locations />
				</Grid>
			</Grid>
		</PageContainer>
	);
};

export default ManageOrder;

ManageOrder.getLayout = function getLayout(page: ReactElement) {
	return <FullLayout>{page}</FullLayout>;
};
