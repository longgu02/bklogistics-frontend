import { Box, Button, Chip, Grid, Paper, Stack, Typography } from "@mui/material";
import { getStatus } from "../../../utils";

type ShipmentRequestRow = {
  shipmentRequest: {
    orderId: number;
    sender: string;
    carrier: string;
    receiver: string;
    create_date: number;
    status: number;
  };
};
export default function RequestRow (props: ShipmentRequestRow) {
    const {shipmentRequest} = props;
    const color: string[] = [
      "#2a2d34",
      "#009ddc",
      "#f26430",
      "#6761a8",
      "#009b72",
    ];
    return (
      <Paper sx={{ p: 2 }}>
        <Box>
          <Grid container>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>{shipmentRequest.orderId}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>{shipmentRequest.sender}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>{shipmentRequest.receiver}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Chip
                label={String(getStatus(shipmentRequest.status))}
                size="small"
                sx={{
                  mt: 1,
                  px: "4px",
                  color: "#fff",
                  backgroundColor: color[shipmentRequest.status],
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>
                {new Date(
                  shipmentRequest.create_date * 1000
                ).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Button>Check</Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    );
}