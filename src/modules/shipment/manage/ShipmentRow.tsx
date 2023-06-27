import {
  Box,
  Button,
  Typography,
  Collapse,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Grid,
  useTheme,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import useProductContract from "../../../hooks/useProductContract";
import React from "react";
import { useAppSelector } from "../../../redux/hooks";

type ShipmentRowProps = {
  shipment: {
    shipmentId: number;
    orderId: number;
    sender: string;
    carrier: string;
    receiver: string;
    pickUpDate: string;
    deliveryDate: string;
    status: number;
  };
};

export default function ShipmentRow(props: ShipmentRowProps){
    const {shipment} = props;
    const {chainId, signer} = useAppSelector((state) => state.wallet);
    const [isOpen, setOpen] = React.useState<boolean>(false);
    return (
      <Paper sx={{ p: 2 }}>
        <Box>
          <Grid container>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>{shipment.shipmentId}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>{shipment.orderId}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>{shipment.pickUpDate}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>{shipment.deliveryDate}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}></Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!isOpen)}
              >
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Box>
        <Collapse in={isOpen} timeout="auto" unmountOnExit component={Paper}>
        </Collapse>
      </Paper>
    );
}