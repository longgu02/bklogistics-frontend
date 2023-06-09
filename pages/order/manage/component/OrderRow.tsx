import {
  Box,
  Button,
  TableCell,
  TableRow,
  Typography,
  Collapse,
  IconButton,
  Tabs,
  Tab,
  useTheme,
  Paper,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";
import { getOrders } from "../../../../src/services/order-api";
import { getAllProductOnChain } from "../../../../src/services/product-api";
import useSupplyChain from "../../../../src/hooks/useSupplyChain";
import { useAppSelector } from "../../../../src/redux/hooks";
interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}
function a11yProps(index: any) {
  return {
    id: `action-tab-${index}`,
    "aria-controls": `action-tabpanel-${index}`,
  };
}
const OrderRow = ({ obj } : any) => {
  const {id, product, quantity, status, date} = obj;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const { chainId, signer, address } = useAppSelector((state) => state.wallet);
  const theme = useTheme();
  const handleChange = (event: unknown, newValue: number) => {
    let res : any[] = [];
    getAllProductOnChain(5).then((results) => results.forEach((product : any) => res.push({
      productId: Number(product["productId"]),
    })));
    setValue(newValue);
  };
  const getOrder = async (orderId: number) => {
    if (signer) {
      const { viewOrder } = useSupplyChain(signer, chainId);
      console.log(
        "🚀 ~ file: OrderRow.tsx:73 ~ getStatus ~ await viewOrder(orderId):",
        await viewOrder(orderId)
      );
    }
  };
  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  return (
    <>
      <TableRow hover={true} component={Paper} sx={{marginTop: 2}}>
        <TableCell>{id}</TableCell>
        <TableCell>{product}</TableCell>
        <TableCell align="center">{quantity}</TableCell>
        <TableCell>{status}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit component={Paper}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="action tabs example"
            >
              <Tab label="Information" {...a11yProps(0)} />
              <Tab label="Supplier" {...a11yProps(1)} />
              <Tab label="Manufacturer" {...a11yProps(2)} />
            </Tabs>
            <TabPanel value={value} index={0} dir={theme.direction}>
              {product}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              {product}
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              {product}
              <br />
              <Button variant="contained">Confirm</Button>
            </TabPanel>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default OrderRow;
