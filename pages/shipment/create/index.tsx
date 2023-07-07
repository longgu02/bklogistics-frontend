import { Box, Grid } from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import CreateForm from "../../../src/modules/shipment/create/CreateForm";
import CreateInvoice from "../../../src/modules/shipment/manage/CreateInvoice";

const CreateShipment = () => {
	return (
		<PageContainer title="Create Shipment" description="Create Shipment page">
			<DashboardCard title="Create Shipment">
				<Box>
					<Grid container>
						<Grid item xs={6} sx={{ px: 2 }}>
							<CreateForm />
						</Grid>
						<Grid item xs={6} sx={{ px: 2 }}>
							<CreateInvoice />
						</Grid>
					</Grid>
				</Box>
			</DashboardCard>
		</PageContainer>
	);
};

export default CreateShipment;

CreateShipment.getLayout = function getLayout(page: ReactElement) {
	return <FullLayout>{page}</FullLayout>;
};
