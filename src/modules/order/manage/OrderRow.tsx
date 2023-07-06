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
  Chip,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React, { useEffect } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { getProductById } from "../../../services/product-api";
import { getStatus } from "../../../utils";
import { ethers } from "ethers";
import useSupplyChain from "../../../hooks/useSupplyChain";
import useNotify from "../../../hooks/useNotify";
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
  const { signer, chainId, address } = useAppSelector((state) => state.wallet);
  const [isCus, setIsCus] = React.useState<boolean>(false);
  const [isSup, setIsSup] = React.useState<boolean>(false);
  const [isManu, setIsManu] = React.useState<boolean>(false);
  const [isOpen, setOpen] = React.useState<boolean>(false);
  const { successNotify, errorNotify } = useNotify();
  const [value, setValue] = React.useState(0);
  const theme = useTheme();
  const color: string[] = [
    "#2a2d34",
    "#009ddc",
    "#f26430",
    "#6761a8",
    "#009b72",
  ];
  const [productName, setProductName] = React.useState<string>("");
  const getProductName = (productId: number) => {
    const res = getProductById(chainId, productId);
    res.then((PromiseResult) => {
      setProductName(String(PromiseResult[0]["name"]));
    });
  };
  const handleChange = (event: unknown, newValue: number) => {
    setValue(newValue);
  };
  getProductName(order.productId);
  useEffect(() => {
    if (address === order.customer) setIsCus(true);
    order.suppliers.forEach((supplier) => {
      if (address === supplier) setIsSup(true);
    });
    order.manufacturers.forEach((manufacturer) => {
      if (address === manufacturer) setIsManu(true);
    });
  }, []);

  const handlePayOrder = async () => {
    if (signer) {
      const { payOrder, getTotalPrice, contract } = useSupplyChain(
        signer,
        chainId
      );
      const totalPrice =
        Number(await getTotalPrice(order.orderId)) - order.deposited;
      await payOrder(order.orderId, totalPrice);
    }
  };
  const handleConfirmOrder = async () => {
    if (signer) {
      const { confirmOrder } = useSupplyChain(signer, chainId);
      await confirmOrder(order.orderId);
    }
  };
  const isSigned = async (_address: string) => {
    if (signer) {
      const { hasSigned } = useSupplyChain(signer, chainId);
      const t = await hasSigned(order.orderId, _address).then((result) => {
        return result;
      });
      return t;
    }
  };
  const [supplierSign, setSupplierData] = React.useState<boolean[]>([]);
  const [manufacturerSign, setManufacturerSign] = React.useState<boolean[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const supplierData: boolean[] = await Promise.all(
        order.suppliers.map((supplier) => isSigned(supplier))
      );
      setSupplierData(supplierData);
    };

    fetchData();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      const manufacturerData: boolean[] = await Promise.all(
        order.manufacturers.map((manufacturer) => isSigned(manufacturer))
      );
      setManufacturerSign(manufacturerData);
    };

    fetchData();
  }, []);
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
              <Chip
                label={order.isPaid ? "Yes" : "No"}
                size="small"
                sx={{
                  mt: 1,
                  px: "4px",
                  color: "#fff",
                  backgroundColor: order.isPaid ? "#4EB09B" : "#E17A8D",
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Chip
                label={String(getStatus(order.status))}
                size="small"
                sx={{
                  mt: 1,
                  px: "4px",
                  color: "#fff",
                  backgroundColor: color[order.status],
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>
                {/* {String(getProductName(5))} */}
                {new Date(order.createDate * 1000).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
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
          <Tab label="Shipments" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Typography sx={{ mt: 1 }}>
            {/* {String(getProductName(5))} */}
            Customer : {order.customer}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            {/* {String(getProductName(5))} */}
            Total Price : {ethers.formatEther((order.deposited * 100) / 20)} ETH
          </Typography>
          <Typography sx={{ mt: 1 }}>
            {/* {String(getProductName(5))} */}
            Deposited : {ethers.formatEther(order.deposited)} ETH
          </Typography>
          <br />
          {order.isPaid ||
            (isCus && (
              <Button variant="contained" onClick={() => handlePayOrder()}>
                Confirm
              </Button>
            ))}
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Typography sx={{ mt: 1 }}>
            {/* {String(getProductName(5))} */}
            Suppliers:
          </Typography>
          {order.suppliers.map((supplier, index) => {
            return (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "start",
                  }}
                  key={supplier}
                >
                  <Typography sx={{ mt: 1 }}>{supplier} : </Typography>
                  <Chip
                    label={supplierSign[index] ? "Signed" : "Not Sign"}
                    size="small"
                    sx={{
                      mt: 1,
                      px: "4px",
                      color: "#fff",
                      backgroundColor: supplierSign[index]
                        ? "#4EB09B"
                        : "#E17A8D",
                    }}
                  />
                </Box>
                <br />
                {isSup && !supplierSign[index] && (
                  <Button
                    variant="contained"
                    onClick={() => handleConfirmOrder()}
                  >
                    Confirm
                  </Button>
                )}
              </>
            );
          })}
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Typography sx={{ mt: 1 }}>
            {/* {String(getProductName(5))} */}
            Manufacturers:
          </Typography>
          {order.manufacturers.map((manufacturer, index) => {
            return (
              <>
                <Box
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "start",
                  }}
                >
                  <Typography sx={{ mt: 1 }}>{manufacturer} : </Typography>
                  <Chip
                    label={manufacturerSign[index] ? "Signed" : "Not Sign"}
                    size="small"
                    sx={{
                      mt: 1,
                      px: "4px",
                      color: "#fff",
                      backgroundColor: manufacturerSign[index]
                        ? "#4EB09B"
                        : "#E17A8D",
                    }}
                  />
                </Box>
                <br />
                {isManu && !manufacturerSign[index] && (
                  <Button
                    variant="contained"
                    onClick={() => handleConfirmOrder()}
                  >
                    Confirm
                  </Button>
                )}
              </>
            );
          })}
        </TabPanel>
        <TabPanel value={value} index={3} dir={theme.direction}>
          <Typography sx={{ mt: 1 }}>
            Shipments of Order : {order.customer}
          </Typography>
        </TabPanel>
      </Collapse>
    </>
  );
}
