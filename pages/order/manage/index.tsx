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
  Paper,
} from "@mui/material";
import FullLayout from "../../../src/layouts/full/FullLayout";
import type { ReactElement } from "react";
import PageContainer from "../../../src/components/container/PageContainer";
import DashboardCard from "../../../src/components/shared/DashboardCard";
import orderSlice from "../../../src/redux/order/orderSlice";
import OrderRow from "./component/OrderRow";
import React from "react";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
interface Order {
  id: number;
  product: string;
  quantity: number;
  status: string;
  date: string;
}

const orders: Order[] = [
  {
    id: 1,
    product: "iPhone 12",
    quantity: 2,
    status: "Shipped",
    date: "2021-10-01",
  },
  {
    id: 2,
    product: "MacBook Pro",
    quantity: 1,
    status: "Processing",
    date: "2021-09-28",
  },
  {
    id: 3,
    product: "Nike Shoes",
    quantity: 3,
    status: "Delivered",
    date: "2021-10-05",
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
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Product</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
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
