import { Box, Container, Typography, Grid, Card } from "@mui/material";
import FullLayout from "../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../src/components/container/PageContainer";
import DashboardCard from "../../src/components/shared/DashboardCard";
import ProfileCover from "../../src/modules/profile/ProfileCover";
import RecentActivity from "../../src/modules/profile/RecentActivity";
import MyCards from "../../src/modules/profile/MyCard";
import Locations from "../../src/modules/profile/Locations";
const user = {
	savedCards: 7,
	name: "Catherine Pike",
	coverImg:
		"https://img.freepik.com/premium-vector/aesthetic-pastel-gradient-blue-purple-gradient-wallpaper-illustration-perfect-backdrop-wallpaper-background-banner-cover_565280-1124.jpg",
	avatar:
		"https://anhdepfree.com/wp-content/uploads/2023/03/anh-chu-cho-shiba_5879249153-1080x1080.jpg",
	description:
		"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
	jobtitle: "Web Developer",
	location: "Barcelona, Spain",
	followers: "465",
};
const ManageOrder = () => {
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
					<MyCards />
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
