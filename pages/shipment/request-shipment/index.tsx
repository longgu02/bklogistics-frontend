import { Box, Typography } from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import { useAppSelector } from "../../../src/redux/hooks";
import useSupplyChain from "../../../src/hooks/useSupplyChain";
import { getShipmentOnChainByAddress } from "../../../src/services/shipment-api";
import React from "react";
const RequestShipment = () => {
  const { signer, chainId, address } = useAppSelector((state) => state.wallet);
  const [shipmentRequestList, setShipmentRequest] = React.useState<any>([]);
  const getData = async () => {
    const response = await getShipmentOnChainByAddress(5, address);
    if (response! == undefined) {
      // response.data
      // console.log(
      //   "🚀 ~ file: index.tsx:16 ~ getData ~ response.data:",
      //   response.data
      // );
    }
  };
  getData();
  return (
    <PageContainer title="Manage Shipment" description="Manage Shipment page">
      <Typography variant="h4" sx={{ mb: 3 }}>
        Request Shipment
      </Typography>
    </PageContainer>
  );
};

export default RequestShipment;

RequestShipment.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
