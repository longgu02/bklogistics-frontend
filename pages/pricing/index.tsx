import { Box, Typography } from "@mui/material";
import FullLayout from "../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../src/components/container/PageContainer";
import DashboardCard from "../../src/components/shared/DashboardCard";
import PriceList from "../../src/modules/pricing/PriceList";
import { PricingType } from "../../src/hooks/usePricingContract";
import WalletRequired from "../../src/layouts/full/auth/WalletRequired";

// Get services -> Get on sale products

const TEST_PRODUCT = [
	{ productId: 1, name: "Cowhide", type: PricingType.MATERIAL },
	{ productId: 2, name: "Silver Necklace", type: PricingType.PRODUCT },
	{ productId: 5, name: "Yamaha Guitar", type: PricingType.PRODUCT },
	{ productId: 6, name: "Xbox Gamepad", type: PricingType.PRODUCT },
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
	return (
		<FullLayout>
			<WalletRequired>{page}</WalletRequired>
		</FullLayout>
	);
};
