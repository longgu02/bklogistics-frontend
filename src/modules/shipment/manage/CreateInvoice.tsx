import { Box, Typography } from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import useSupplyChain from "../../../hooks/useSupplyChain";

export default function CreateInvoice() {
  const { orderId, carrier, pickupDate, to } = useAppSelector((state) => state.shipment);
  const {signer, chainId, address} = useAppSelector((state) => state.wallet)
  
  return (
    <Box>
      <Typography
        variant="h4"
        mb="5px"
        sx={{ fontWeight: 600, textAlign: "center" }}
      >
        Invoice
      </Typography>
      <Typography variant="subtitle1" mb="5px">
        <span style={{ fontWeight: 600 }}>Order ID: {orderId}</span>
      </Typography>
      <Typography variant="subtitle1" mb="5px">
        <span style={{ fontWeight: 600 }}>From: {address} </span>
      </Typography>
      <Typography variant="subtitle1" mb="5px">
        <span style={{ fontWeight: 600 }}>Carrier: {carrier}</span>
      </Typography>
      <Typography variant="subtitle1" mb="5px">
        <span style={{ fontWeight: 600 }}>To: {to} </span>
      </Typography>
      <Typography variant="subtitle1" mb="5px">
        <span style={{ fontWeight: 600 }}>Product/Material: </span>
      </Typography>
      <Typography variant="subtitle1" mb="5px">
        <span style={{ fontWeight: 600 }}>
          Create Date:{" "}
          {new Date(Number(pickupDate)).toLocaleDateString("en-us", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
        </span>
      </Typography>
      {/* <Typography variant="subtitle1" mb="5px">
        <span style={{ fontWeight: 600 }}>Cost: </span>
      </Typography> */}
    </Box>
  );
}
