import { Box, Typography, Paper } from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import WalletRequired from "../../../src/layouts/full/auth/WalletRequired";
import OrderList from "../../../src/modules/order/manage/OrderList";
import { useAppSelector } from "../../../src/redux/hooks";
import useSupplyChain from "../../../src/hooks/useSupplyChain";
import React from "react";
// interface Order {
// 	id: number;
// 	product: string;
// 	quantity: number;
// 	status: string;
// 	date: string;
// }

// const orders: Order[] = [
// 	{
// 		id: 1,
// 		product: "iPhone 12",
// 		quantity: 2,
// 		status: "Shipped",
// 		date: "2021-10-01",
// 	},
// 	{
// 		id: 2,
// 		product: "MacBook Pro",
// 		quantity: 1,
// 		status: "Processing",
// 		date: "2021-09-28",
// 	},
// 	{
// 		id: 3,
// 		product: "Nike Shoes",
// 		quantity: 3,
// 		status: "Delivered",
// 		date: "2021-10-05",
// 	},
// ];

// const DataTable = () => {
// 	return (
// 		<React.Fragment>
// 			{orders.map((data, i) => {
// 				return <OrderRow obj={data} key={i} />;
// 			})}
// 		</React.Fragment>
// 	);
// };

const ManageOrder = () => {
  const { chainId, signer, address } = useAppSelector((state) => state.wallet);
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
  const [orderList, setOrderList] = React.useState<any>([]);
  React.useEffect(()=>{
	  getOrder(25).then((result) => setOrderList([result[0]]));

  },[address]);
  console.log("🚀 ~ file: index.tsx:80 ~ ManageOrder ~ orderList:", orderList);
  return (
    <PageContainer title="Manage Order" description="Manage Order page">
      <Box>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Manage Order
        </Typography>
        <OrderList orderList={orderList} />
      </Box>
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
