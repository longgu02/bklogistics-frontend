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
import React from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getProductById } from "../../../services/product-api";
import { getStatus } from "../../../utils";
import { ethers } from "ethers";
interface OrderRowProps {
  order: {
    orderId: number;
    productId: number;
    customer: string;
    suppliers: string[];
    manufacturers: string[];
    createDate: number;
    status: number;
    isPaid: boolean;
    deposited: number;
  };
}
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
export default function OrderRow(props: OrderRowProps) {
  const { order } = props;
  // console.log(
  //   "🚀 ~ file: OrderRow.tsx:62 ~ OrderRow ~ order:",
  //   order["productId"]
  // );
  const { chainId } = useAppSelector((state) => state.wallet);

  const [isOpen, setOpen] = React.useState<boolean>(false);
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const [productName, setProductName] = React.useState<string>("");
  const getProductName = (productId: number) => {
    const res = getProductById(chainId, productId);
    console.log("🚀 ~ file: OrderRow.tsx:76 ~ getProductName ~ res:", res);
    res.then((PromiseResult) => {
      console.log("🚀 ~ file: OrderRow.tsx:77 ~ getProductName ~ PromiseResult:", PromiseResult[0]["name"]);
      setProductName(String(PromiseResult[0]["name"]));
    })
    // return name;
    console.log("🚀 ~ file: OrderRow.tsx:79 ~ getProductName ~ name:", name);
  };
  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };
  // setProductName(getProductName(order.productId));
  // console.log(
  //   "🚀 ~ file: OrderRow.tsx:78 ~ OrderRow ~ productName:",
  //   productName
  // );
  getProductName(order.productId);
  return (
    <>
      <Paper sx={{ p: 2 }}>
        <Box>
          <Grid container>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1, paddingLeft: 3 }}>
                {String(order.orderId)}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>{productName}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1, paddingLeft: 2 }}>
                {/* {String(getProductName(5))} */}
                {order.isPaid ? "Yes" : "Not"}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>
                {/* {String(getProductName(5))} */}
                {String(getStatus(order.status))}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>
                {/* {String(getProductName(5))} */}
                {new Date(order.createDate*1000).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric", hour:"2-digit", minute:"2-digit"})}
                {/* {order.createDate} */}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => {
                  setOpen(!isOpen);
                }}
              >
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      <Collapse in={isOpen} timeout="auto" unmountOnExit component={Paper}>
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
          <Typography sx={{ mt: 1 }}>
            {/* {String(getProductName(5))} */}
            Customer : {order.customer}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            {/* {String(getProductName(5))} */}
            Deposited : {ethers.formatEther(order.deposited)} ETH
          </Typography>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Typography sx={{ mt: 1 }}>
            {/* {String(getProductName(5))} */}
            Suppliers:
          </Typography>
          {order.suppliers.map((supplier) => (
            <Typography sx={{ mt: 1 }}>
              {/* {String(getProductName(5))} */}
              {`         ${supplier}: not sign`}
            </Typography>
          ))}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Typography sx={{ mt: 1 }}>
            {/* {String(getProductName(5))} */}
            Manufacturers:
          </Typography>
          {order.manufacturers.map((manufacturer) => (
            <Typography sx={{ mt: 1 }}>
              {/* {String(getProductName(5))} */}
              {"    " + `         ${manufacturer}: not sign`}
            </Typography>
          ))}
          <br />
          <Button variant="contained">Confirm</Button>
        </TabPanel>
      </Collapse>
    </>
  );
}
