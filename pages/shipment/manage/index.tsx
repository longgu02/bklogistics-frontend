import { Box, Typography } from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import { useAppSelector } from "../../../src/redux/hooks";
import useSupplyChain from "../../../src/hooks/useSupplyChain";


const ManageShipment = () => {
	return (
    <PageContainer title="Manage Shipment" description="Manage Shipment page">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Manage Shipment
      </Typography>
    </PageContainer>
  );
};

export default ManageShipment;

ManageShipment.getLayout = function getLayout(page: ReactElement) {
	return <FullLayout>{page}</FullLayout>;
};
