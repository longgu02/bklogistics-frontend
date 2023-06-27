import { Box, Grid, Stack } from "@mui/material";
import ShipmentRow from "./ShipmentRow";

type ShipmentListProps = {
  shipmentList: Array<{
    shipmentId: number;
    orderId: number;
    sender: string;
    carrier: string;
    receiver: string;
    pickUpDate: string;
    deliveryDate: string;
    status: number;
  }>;
};

export default function ShipmentList(props: ShipmentListProps) {
  const { shipmentList } = props;
  return (
    <Box>
      <Box
        sx={{
          paddingLeft: "20px",
          paddingRight: "20px",
          mb: 1,
          fontWeight: 500,
        }}
      >
        <Grid container>
          <Grid item xs={2}>
            Shipment Id
          </Grid>
          <Grid item xs={2}>
            Order Id
          </Grid>
          <Grid item xs={2}>
            Pick Up Date
          </Grid>
          <Grid item xs={2}>
            Delivery Date
          </Grid>
          <Grid item xs={2}>
            Status
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Box>
      <Box>
        <Stack spacing={1}>
          {shipmentList.map((shipment) => (
            <ShipmentRow shipment={shipment} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
