import { Box, Typography } from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import DashboardCard from "../../../src/components/shared/DashboardCard";

const ManageShipment = () => {
	return (
		<PageContainer title="Manage Shipment" description="Manage Shipment page">
			<DashboardCard title="Manage Shipment">
				<Typography>Manage Shipment</Typography>
			</DashboardCard>
		</PageContainer>
	);
};

export default ManageShipment;

ManageShipment.getLayout = function getLayout(page: ReactElement) {
	return <FullLayout>{page}</FullLayout>;
};
