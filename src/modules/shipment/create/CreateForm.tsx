import {
  Box,
  Button,
  Collapse,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import { useEffect, useState } from "react";
import {
  setCarrier,
  setOrderId,
  setTo,
} from "../../../redux/shipment/shipmentSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useSupplyChain from "../../../hooks/useSupplyChain";
import useNotify from "../../../hooks/useNotify";
import useShippingContract from "../../../hooks/useShippingContract";
import useRolesContract from "../../../hooks/useRolesContract";
import { createShipment, shipment } from "../../../services/shipment-api";
export default function CreateForm() {
  const { orderId, pickupDate, carrier, to } = useAppSelector(
    (state) => state.shipment
  );
  const [order, setOrder] = useState<number>();
  const [_carrier, setCarr] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const { chainId, signer, address } = useAppSelector((state) => state.wallet);
  const { successNotify, errorNotify } = useNotify();
  const [orderDetail, setOrderDetail] = useState<{
    orderId: number;
    productId: number;
    customer: string;
    suppliers: string[];
    manufacturers: string[];
    createDate: number;
    status: number;
    isPaid: boolean;
    deposited: number;
  }>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(setOrderId(Number(order)));
    }, 300);
  }, [order]);
  useEffect(() => {
    setTimeout(() => {
      dispatch(setCarrier(String(_carrier)));
    }, 300);
  }, [_carrier]);
  useEffect(() => {
    if (receiver) {
      setTimeout(() => {
        dispatch(setTo(String(receiver)));
      }, 300);
    }
  }, [receiver]);
  const getOrder = async (orderId: number) => {
    let order: any = [];
    if (signer) {
      const { viewOrder } = useSupplyChain(signer, chainId);
      await viewOrder(orderId)
        .then((result) => {
          let suppliers: string[] = [];
          let manufacturers: string[] = [];
          result[3].map((i: any) => suppliers.push(String(i)));
          result[4].map((i: any) => manufacturers.push(String(i)));
          order.push({
            orderId: Number(result[0]),
            productId: Number(result[1]),
            customer: String(result[2]),
            suppliers: suppliers,
            manufacturers: manufacturers,
            createDate: Number(result[5]),
            status: Number(result[6]),
            isPaid: Boolean(result[7]),
            deposited: Number(result[8]),
          });
        })
        .catch((err) => console.log(err));
    }
    return order;
  };
  useEffect(() => {
    if (orderId) {
      getOrder(orderId).then((result) => setOrderDetail(result[0]));
    } else {
      setOrderDetail(undefined);
    }
  }, [orderId]);
  const handleCheck = (value: string | null) => {
    let check = false;
    if (value && orderDetail) {
      if (value === address) check = true;
      orderDetail.manufacturers.forEach((m) => {
        if (m === value) check = true;
      });
      orderDetail.suppliers.forEach((m) => {
        if (m === value) check = true;
      });
    }
    return check;
  };
  const checkCarrier = async () => {
    if (signer) {
      const { isCarrier } = useRolesContract(signer, chainId);
      const t = await isCarrier(carrier).then((result) => {
        return result;
      });
      return t;
    }
  };
  const handleCreate = async () => {
    if (orderDetail) {
      const newShipment: shipment = {
        orderId: orderDetail.orderId,
        sender: address,
        carrier: carrier,
        receiver: to,
        chainId: chainId,
        create_date: Number(pickupDate),
      };

      await createShipment(newShipment)
        .then((res) => successNotify("Shipment Created Successfully!"))
        .catch((err) => console.error(err));
    }
  };
  const handleConfirm = async () => {
    await checkCarrier().then((res) => {
      if (res) {
        const _to: boolean = handleCheck(to);
        if (_to) {
          handleCreate();
        } else {
          errorNotify("Address not in Orders!");
        }
      } else {
        errorNotify("Address not in Carrier!");
      }
    });
  };
  return (
    <Box>
      <Stack spacing={1} sx={{ position: "relative" }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="address"
        >
          Order ID
        </Typography>
        <Box>
          <CustomTextField
            variant="outlined"
            value={order}
            onChange={(e: any) => setOrder(e.target.value)}
            type="number"
            fullWidth
          />
          {/* <Collapse in={suggestedOrder.length != 0}>
            <Paper
              sx={{
                borderRadius: 0,
                overFlowY: "scroll",
                maxHeight: 300,
              }}
            >
              {suggestedOrder.map((order) => (
                <Grid
                  container
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#F5F7FA" },
                  }}
                  onClick={() => console.log("hehehe")}
                >
                  <Grid item xs={4}>
                    {order.id}
                  </Grid>
                  <Grid item xs={4}>
                    {order.customer}
                  </Grid>
                  <Grid item xs={4}>
                    {order.product}
                  </Grid>
                </Grid>
              ))}
            </Paper>
          </Collapse> */}
        </Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="address"
        >
          Carrier
        </Typography>
        <CustomTextField
          type="address"
          variant="outlined"
          fullWidth
          value={_carrier}
          onChange={(e: any) => setCarr(e.target.value)}
        />
        {orderDetail && (
          <>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="address"
            >
              Receiver
            </Typography>
            <CustomTextField
              type="address"
              variant="outlined"
              fullWidth
              value={receiver}
              onChange={(e: any) => {
                setReceiver(e.target.value);
              }}
            />
          </>
        )}
        {/* <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="address"
        >
          Pickup Date
        </Typography>
        <CustomTextField type="address" variant="outlined" fullWidth /> */}
      </Stack>
      <Button
        variant="contained"
        sx={{ marginLeft: 53, mt: 8 }}
        onClick={() => handleConfirm()}
      >
        Confirm
      </Button>
    </Box>
  );
}
