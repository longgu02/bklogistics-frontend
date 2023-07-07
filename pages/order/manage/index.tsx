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
  getAllOrderOnChainByAddress,
} from "../../../src/services/order-api";

const ManageOrder = () => {
  const { chainId, signer, address } = useAppSelector((state) => state.wallet);
  const [orderList, setOrderList] = React.useState<any>([]);
  const [state, setState] = useState<boolean>(true);
  const getData = async () => {
    if (signer) {
      const { viewOrder } = useSupplyChain(signer, chainId);
      const response = await getAllOrderOnChainByAddress(5, address);
      if (response !== undefined) {
        const ordersLength = response.data.length;
        const order: any = [];
        for (let i = 0; i < ordersLength; i += 30) {
          const orderIds = response.data
            .slice(i, i + 30)
            .map((d: any) => d.order_id);
          const req = orderIds.map(async (orderId: any) => {
            const res = await viewOrder(orderId);
            let suppliers = res[3].map((i : any) => String(i));
            let manufacturers = res[4].map((i : any) => String(i));
            order.push({
              orderId: Number(res[0]),
              productId: Number(res[1]),
              customer: String(res[2]),
              suppliers,
              manufacturers,
              createDate: Number(res[5]),
              status: Number(res[6]),
              isPaid: Boolean(res[7]),
              deposited: Number(res[8]),
            });
          });
          await Promise.all(req).catch((e) => console.log(e));
        }
        setState(false);
        setOrderList(order);
      }
    }
  };
  React.useEffect(() => {
    getData();
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
