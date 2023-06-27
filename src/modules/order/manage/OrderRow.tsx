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
import { Order } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";
import useProductContract from '../../../hooks/useProductContract';
import { getOrders, getProductById } from "../../../services/order-api";
type OrderRowProps = {
    order: Order;
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
    const { chainId, signer, address } = useAppSelector(
      (state) => state.wallet
    );
    const [isOpen, setOpen] = React.useState<boolean>(false);
    const [value, setValue] = React.useState(0);
    const theme = useTheme();
    const getProductName = async (productId: number) => {
        const res = await getProductById(chainId, productId);
        let name : string = '';
        res.then((result: any) => name = result[0]["name"]);
        return name;
    }
    // console.log("🚀 ~ file: ManageRow.tsx:33 ~ getProductName ~ getProductName:", getProductName)
    const getStatus = async (orderId: number) => {
        
    }
    const handleChange = (event: unknown, newValue: number) => {
      const res = getOrders();
      console.log(res);
      setValue(newValue);
    };
    return (
      <Paper sx={{ p: 2 }}>
        <Box>
          <Grid container>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>{String(order.orderId)}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>
                {String(getProductName(5))}
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>
                {/* {String(getProductName(5))} */}
                Quantity
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>
                {/* {String(getProductName(5))} */}
                Status
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography sx={{ mt: 1 }}>
                {/* {String(getProductName(5))} */}
                Date
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <IconButton
                aria-label="expand row"
                size="small"
                onClick={() => setOpen(!isOpen)}
              >
                {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Box>
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
              Order information detail
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={1} dir={theme.direction}>
            <Typography sx={{ mt: 1 }}>
              {/* {String(getProductName(5))} */}
              Order information detail
            </Typography>
          </TabPanel>
          <TabPanel value={value} index={2} dir={theme.direction}>
            <Typography sx={{ mt: 1 }}>
              {/* {String(getProductName(5))} */}
              Order information detail
            </Typography>
            <br />
            <Button variant="contained">Confirm</Button>
          </TabPanel>
        </Collapse>
      </Paper>
    );
}