import { Box, Typography } from "@mui/material";
import FullLayout from "../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../src/components/container/PageContainer";
import DashboardCard from "../../src/components/shared/DashboardCard";
import PriceList from "../../src/modules/pricing/PriceList";

// Get services -> Get on sale products

const TEST_PRODUCT = [
	{ productId: 1, name: "Cowhide", type: "Material" },
	{ productId: 2, name: "Silver Necklace", type: "Product" },
	{ productId: 5, name: "Yamaha Guitar", type: "Product" },
	{ productId: 6, name: "Xbox Gamepad", type: "Product" },
];

const ManageShipment = () => {
	return (
		<PageContainer title="Pricing" description="Pricing page">
			{/* <DashboardCard title="Pricing"> */}
			<Box>
				<Typography variant="h4" sx={{ mb: 3 }}>
					Manage Pricing
				</Typography>
				<PriceList products={TEST_PRODUCT} />
			</Box>
			{/* </DashboardCard> */}
		</PageContainer>
	);
};

export default ManageShipment;

ManageShipment.getLayout = function getLayout(page: ReactElement) {
	return <FullLayout>{page}</FullLayout>;
};
