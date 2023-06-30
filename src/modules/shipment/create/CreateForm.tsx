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
  setShipmentId,
} from "../../../redux/shipment/shipmentSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useSupplyChain from "../../../hooks/useSupplyChain";
import useNotify from "../../../hooks/useNotify";
import { JsonRpcSigner } from "ethers";
import useShippingContract from "../../../hooks/useShippingContract";

export default function CreateForm() {
  const [suggestedOrder, setSuggestedOrder] = useState([]);
  const { orderId, pickupDate, carrier, to } = useAppSelector(
    (state) => state.shipment
  );
  const [order, setOrder] = useState<number>();
  const [_carrier, setCarr] = useState<string>("");
  const [receiver, setReceiver] = useState<string>("");
  const { chainId, signer, address } = useAppSelector((state) => state.wallet);
  const { successNotify, errorNotify } = useNotify();
  // const [check, setCheck] = useState<boolean>(false);
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
      await viewOrder(orderId).then((result) => {
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
      });
    }
    return order;
  };
  useEffect(() => {
    if (orderId) {
      getOrder(orderId).then((result) => setOrderDetail(result[0]));
    }
  }, [orderId]);
  console.log(
    "🚀 ~ file: CreateForm.tsx:31 ~ CreateForm ~ orderDetail:",
    orderDetail
  );
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
  const handleCreate = async() =>{
    if (signer) {
      const { createShipment, contract } = useShippingContract(signer, chainId);
      const res = await createShipment(
        orderId,
        address,
        carrier,
        to,
        Number(pickupDate)
      );
      contract.on("ShippingOrderCreated", () => {
        dispatch(setShipmentId(Number(res)));
        successNotify("Shipment Created");
      });
    }
  }
  const handleConfirm = () => {
    if (handleCheck(to)) {
      handleCreate();
    }
    else {
      errorNotify('Address not in Orders!')
    }
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
      <Button variant="contained" sx={{ marginLeft: 53, mt: 2 }} onClick={()=>handleConfirm()}>
        Confirm
      </Button>
    </Box>
  );
}
