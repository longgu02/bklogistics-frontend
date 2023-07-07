import { Box, Grid, Stack } from "@mui/material";
import RequestRow from "./RequestRow";

type ShipmentRequestList = {
  shipmentRequestList: Array<{
    orderId: number;
    sender: string;
    carrier: string;
    receiver: string;
    create_date: number;
    status: number;
  }>;
};

export default function RequestList(props: ShipmentRequestList) {
  const { shipmentRequestList } = props;
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
            Order Id
          </Grid>
          <Grid item xs={2}>
            Sender
          </Grid>
          <Grid item xs={2}>
            Receiver
          </Grid>
          <Grid item xs={2}>
            Status
          </Grid>
          <Grid item xs={2}>
            Create At
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Box>
      <Box>
        <Stack spacing={1}>
          {shipmentRequestList.map((shipmentRequest) => (
            <RequestRow shipmentRequest={shipmentRequest} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
