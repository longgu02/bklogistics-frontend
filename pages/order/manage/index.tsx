import { Box, Typography, Paper, CircularProgress } from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import WalletRequired from "../../../src/layouts/full/auth/WalletRequired";
import OrderList from "../../../src/modules/order/manage/OrderList";
import { useAppSelector } from "../../../src/redux/hooks";
import useSupplyChain from "../../../src/hooks/useSupplyChain";
import React, { useState } from "react";
import {
  getAllOrderOnChain,
  getAllOrderOnChainByAddress,
} from "../../../src/services/order-api";

const ManageOrder = () => {
  const { chainId, signer, address } = useAppSelector((state) => state.wallet);
  const [orderList, setOrderList] = React.useState<any>([]);
  const [state, setState] = useState<boolean>(true);

  React.useEffect(() => {
    let order: any = [];
    if (signer) {
      const { viewOrder } = useSupplyChain(signer, chainId);
      Promise.all([getAllOrderOnChainByAddress(5, address)]).then(
        (response) => {
          if (response !== undefined) {
            response[0].data.map(async (d: any) => {
              await viewOrder(d.order_id).then((res) => {
                let suppliers: any = [];
                let manufacturers: any = [];
                res[3].map((i: any) => suppliers.push(String(i)));
                res[4].map((i: any) => manufacturers.push(String(i)));
                order.push({
                  orderId: Number(res[0]),
                  productId: Number(res[1]),
                  customer: String(res[2]),
                  suppliers: suppliers,
                  manufacturers: manufacturers,
                  createDate: Number(res[5]),
                  status: Number(res[6]),
                  isPaid: Boolean(res[7]),
                  deposited: Number(res[8]),
                });
              });
            });
            setTimeout(() => {
              setState(false);
              setOrderList(order);
            }, 500);
          }
        }
      );
    }
    // setOrderList(getOrder()
  }, []);

  // getOrder();
  console.log("🚀 ~ file: index.tsx:80 ~ ManageOrder ~ orderList:", orderList);
  return (
    <PageContainer title="Manage Order" description="Manage Order page">
      {state ? (
        <CircularProgress size={30} color="inherit" />
      ) : (
        <Box>
          <Typography variant="h4" sx={{ mb: 3 }}>
            Manage Order
          </Typography>
          <OrderList orderList={orderList} />
        </Box>
      )}
    </PageContainer>
  );
};

export default ManageOrder;

ManageOrder.getLayout = function getLayout(page: ReactElement) {
  return (
    <FullLayout>
      <WalletRequired>{page}</WalletRequired>
    </FullLayout>
  );
};
