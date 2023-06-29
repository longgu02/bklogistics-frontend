import { Box, Grid, Stack } from "@mui/material";
import OrderRow from "./OrderRow";
import { getProductById } from "../../../services/product-api";
import { useAppSelector } from "../../../redux/hooks";
interface OrderListProps {
  orderList: Array<{
    orderId: number;
    productId: number;
    customer: string;
    suppliers: string[];
    manufacturers: string[];
    createDate: number;
    status: number;
    isPaid: boolean;
    deposited: number;
  }>;
}

export default function OrderList(props: OrderListProps) {
  const { orderList } = props;
  orderList.map(async (order) => console.log("1", order));
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
            Order ID
          </Grid>
          <Grid item xs={2}>
            Product
          </Grid>
          <Grid item xs={2}>
            Quantity
          </Grid>
          <Grid item xs={2}>
            Status
          </Grid>
          <Grid item xs={2}>
            Date
          </Grid>
          <Grid item xs={2}></Grid>
        </Grid>
      </Box>
      <Box>
        <Stack spacing={1}>
          {orderList.map((order) => (
            <OrderRow order={order} />
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
