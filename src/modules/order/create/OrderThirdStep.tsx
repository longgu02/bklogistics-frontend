import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputBase,
  IconButton,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useNotify from "../../../hooks/useNotify";
import {
  Supplier,
  Manufacturer,
  setSupplier,
  setManufacturer,
} from "../../../redux/order/orderSlice";
import { styled } from "@mui/material/styles";
import BaseStepper from "../../../components/stepper/BaseStepper";
import FormDialog from "../component/FormDialog";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function OrderThirdStep() {
  const dispatch = useAppDispatch();
  const { successNotify } = useNotify(); // using custom hook for notifications
  const [supplier, setSupplierAddress] = React.useState<Supplier>();
  const [manufacturer, setManufacturerAddress] = React.useState<Manufacturer>();
  const [suppliers, setSuppliersAddress] = React.useState<Supplier[]>([]);
  const [manufacturers, setManufacturersAddress] = React.useState<
    Manufacturer[]
  >([]);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = ({ setOpen }: any) => {
    setOpen(true);
  };
  const handleClose = ({ setClose }: any) => {
    setClose(false);
  };
  const handleConfirm = () => {
    successNotify("Success!");
    dispatch(setSupplier(suppliers));
    dispatch(setManufacturer(manufacturers));
  };
  const handleConfirm1 = () => {
    let address: Supplier[] = [...suppliers, supplier];
    setSuppliersAddress(address);
    setSupplierAddress("");
    handleClose({ setClose: setOpen1 });
  };
  const handleConfirm2 = () => {
    let address: Manufacturer[] = [...manufacturers, manufacturer];
    setManufacturersAddress(address);
    setManufacturerAddress("");
    handleClose({ setClose: setOpen2 });
  };
  const product = useAppSelector((state) => state.orderData.product);
  const RenderItem = (items: any[]) => {
    return (
      <>
        {items.map((item, i) => (
          <TableRow key={i}>
            <TableCell>{item}</TableCell>
          </TableRow>
        ))}
      </>
    );
  };
  return (
    <BaseStepper
      isDisabled={suppliers.length === 0 && manufacturers.length === 0}
      handleConfirm={handleConfirm}
    >
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <Item>Supplier</Item>
                  </TableRow>
                </TableHead>
                <TableBody>{RenderItem(suppliers)}</TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <Item>Manufacturer</Item>
                  </TableRow>
                </TableHead>
                <TableBody>{RenderItem(manufacturers)}</TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleOpen({ setOpen: setOpen1 })}
          >
            Open
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => handleOpen({ setOpen: setOpen2 })}
          >
            Open
          </Button>
        </Grid>
      </Grid>
      <FormDialog
        title="Supplier Address"
        isDisabled={supplier ? false : true}
        handleClose={() => handleClose({ setClose: setOpen1 })}
        open={open1}
        confirm={handleConfirm1}
      >
        <TextField
          fullWidth
          value={supplier}
          label="Address"
          required
          onChange={(event) => setSupplierAddress(event.target.value)}
        />
        <Box sx={{ display: "flex", marginTop: 2 }}>
          <TextField label="Notes" sx={{ width: 300 }} />
          <TextField
            label="Quantity"
            type="number"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{product.unit}</InputAdornment>
              ),
            }}
            sx={{ marginLeft: 2, width: 150 }}
          />
        </Box>
      </FormDialog>
      <FormDialog
        title="Manufacturer Address"
        isDisabled={manufacturer ? false : true}
        handleClose={() => handleClose({ setClose: setOpen2 })}
        open={open2}
        confirm={handleConfirm2}
      >
        <TextField
          fullWidth
          value={manufacturer}
          label="Address"
          required
          onChange={(event) => setManufacturerAddress(event.target.value)}
        />
        <Box sx={{ display: "flex", marginTop: 2 }}>
          <TextField label="Notes" sx={{ width: 300 }} />
          <TextField
            label="Quantity"
            type="number"
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">{product.unit}</InputAdornment>
              ),
            }}
            sx={{ marginLeft: 2, width: 150 }}
          />
        </Box>
      </FormDialog>
    </BaseStepper>
  );
}
