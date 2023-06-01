import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import orderSlice from "../../../src/redux/order/orderSlice";
import OrderRow from "./component/OrderRow";
import React from "react";

interface Order {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const orders: Order[] = [
  {
    id: 1,
    name: "Product A",
    price: 10.0,
    quantity: 2,
  },
  {
    id: 2,
    name: "Product B",
    price: 15.0,
    quantity: 1,
  },
  {
    id: 3,
    name: "Product C",
    price: 20.0,
    quantity: 3,
  },
  {
    id: 1,
    name: "Product A",
    price: 10.0,
    quantity: 2,
  },
  {
    id: 2,
    name: "Product B",
    price: 15.0,
    quantity: 1,
  },
  {
    id: 3,
    name: "Product C",
    price: 20.0,
    quantity: 3,
  },
  {
    id: 1,
    name: "Product A",
    price: 10.0,
    quantity: 2,
  },
  {
    id: 2,
    name: "Product B",
    price: 15.0,
    quantity: 1,
  },
  {
    id: 3,
    name: "Product C",
    price: 20.0,
    quantity: 3,
  },
  {
    id: 1,
    name: "Product A",
    price: 10.0,
    quantity: 2,
  },
  {
    id: 2,
    name: "Product B",
    price: 15.0,
    quantity: 1,
  },
  {
    id: 3,
    name: "Product C",
    price: 20.0,
    quantity: 3,
  },
  {
    id: 1,
    name: "Product A",
    price: 10.0,
    quantity: 2,
  },
  {
    id: 2,
    name: "Product B",
    price: 15.0,
    quantity: 1,
  },
  {
    id: 3,
    name: "Product C",
    price: 20.0,
    quantity: 3,
  },
  {
    id: 1,
    name: "Product A",
    price: 10.0,
    quantity: 2,
  },
  {
    id: 2,
    name: "Product B",
    price: 15.0,
    quantity: 1,
  },
  {
    id: 3,
    name: "Product C",
    price: 20.0,
    quantity: 3,
  },
  {
    id: 1,
    name: "Product A",
    price: 10.0,
    quantity: 2,
  },
  {
    id: 2,
    name: "Product B",
    price: 15.0,
    quantity: 1,
  },
  {
    id: 3,
    name: "Product C",
    price: 20.0,
    quantity: 3,
  },
  {
    id: 1,
    name: "Product A",
    price: 10.0,
    quantity: 2,
  },
  {
    id: 2,
    name: "Product B",
    price: 15.0,
    quantity: 1,
  },
  {
    id: 3,
    name: "Product C",
    price: 20.0,
    quantity: 3,
  },
  {
    id: 1,
    name: "Product A",
    price: 10.0,
    quantity: 2,
  },
  {
    id: 2,
    name: "Product B",
    price: 15.0,
    quantity: 1,
  },
  {
    id: 3,
    name: "Product C",
    price: 20.0,
    quantity: 3,
  },
];

const DataTable = () => {
  return (
    <React.Fragment>
      {orders.map((data, i) => {
        return <OrderRow obj={data} key={i} />;
      })}
    </React.Fragment>
  );
};

const ManageOrder = () => {
  return (
    <PageContainer title="Manage Order" description="this is Sample page">
      <DashboardCard title="Manage Order">
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Product's Name</TableCell>
                <TableCell>Product's price</TableCell>
                <TableCell>Order's quantity</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <DataTable />
            </TableBody>
          </Table>
        </TableContainer>
      </DashboardCard>
    </PageContainer>
  );
};

export default ManageOrder;

ManageOrder.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
