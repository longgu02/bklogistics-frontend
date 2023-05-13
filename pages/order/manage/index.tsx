import { Box, Typography } from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import DashboardCard from "../../../src/components/shared/DashboardCard";

const ManageOrder = () => {
	return (
		<PageContainer title="Manage Order" description="this is Sample page">
			<DashboardCard title="Manage Order">
				<Typography>Manage Order</Typography>
			</DashboardCard>
		</PageContainer>
	);
};

export default ManageOrder;

ManageOrder.getLayout = function getLayout(page: ReactElement) {
	return <FullLayout>{page}</FullLayout>;
};
