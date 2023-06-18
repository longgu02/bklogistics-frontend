import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete, {
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { styled } from "@mui/material/styles";
import BaseStepper from "../../../components/stepper/BaseStepper";
import FormDialog from "../component/FormDialog";
import { formatAddress } from "../../../utils";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useNotify, { errorNotify } from "../../../hooks/useNotify";
import {
  Unit,
  Order_Stakeholder,
  Material,
  Rq_Material,
  Rq_Product,
  Role,
} from "../../../types";
import profileList from "../../../fakeData/fakeProfile";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ROLE = [
  {
    role: "Supplier",
  },
  {
    role: "Manufacturer",
  },
];

const MaterialList: Material[] = [
  {
    material_id: 1,
    name: "Cotton",
    unit: [Unit.KILOGRAM],
    price: 8.99,
  },
  {
    material_id: 2,
    name: "Denim",
    unit: [Unit.METER],
    price: 12.99,
  },
  {
    material_id: 3,
    name: "Silk",
    unit: [Unit.METER],
    price: 24.99,
  },
  {
    material_id: 4,
    name: "Leather",
    unit: [Unit.METER],
    price: 49.99,
  },
  {
    material_id: 5,
    name: "Wool",
    unit: [Unit.KILOGRAM],
    price: 15.99,
  },
];

function Row(props: Order_Stakeholder) {
  const {
    addressWallet,
    name,
    address,
    role,
    supplier_material,
    manufacturer_product,
    validation,
  } = props;
  const [open, setOpen] = useState(false);

  const total = () => {
    let _total = 0;
    if (role === "Supplier") {
      supplier_material?.forEach(
        (material) => (_total += material.material.price * material.quantity)
      );
    } else
      manufacturer_product?.forEach(
        (product) => (_total += product.product.price * product.quantity)
      );
    return _total;
  };

  const RenderItem = () => {
    return (
      <>
        {role == "Supplier"
          ? supplier_material?.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.material.name}</TableCell>
                <TableCell>{item.material.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.material.unit}</TableCell>
                <TableCell>{item.quantity * item.material.price}</TableCell>
              </TableRow>
            ))
          : manufacturer_product?.map((item, i) => (
              <TableRow key={i}>
                <TableCell>{item.product.name}</TableCell>
                <TableCell>{item.product.price}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.product.price * item.quantity}</TableCell>
              </TableRow>
            ))}
      </>
    );
  };

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{formatAddress(addressWallet, 5)}</TableCell>
        <TableCell style={{ color: validation ? "green" : "red" }}>
          {validation ? "Verified" : "Not Verified"}
        </TableCell>
        <TableCell>{role}</TableCell>
        <TableCell>{total()}</TableCell>
      </TableRow>
      <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ margin: 1 }}>
            <Typography variant="h6" gutterBottom component="div">
              Details Information
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
              Name: {name}
            </Typography>
            <Typography variant="body1" gutterBottom component="div">
              Address: {address}
            </Typography>
            <Table size="small" aria-label="purchases">
              <TableHead>
                <TableRow>
                  <TableCell>
                    {role === "Supplier" ? "Material" : "Product"}
                  </TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  {role === "Supplier" && <TableCell>Unit</TableCell>}
                  <TableCell>Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{RenderItem()}</TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </>
  );
}

export default function OrderThirdStep() {
  const dispatch = useAppDispatch();
  const { successNotify, errorNotify } = useNotify();
  const [addressWallet, setAddressWallet] = useState<string>("");
  const [role, setRoleAddress] = useState<{ role: string }>({
    role: "Supplier",
  });
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [unit, setUnit] = useState<Unit>();
  const [availableUnits, setAvailableUnits] = useState<Unit[]>([]);
  const [materials, setMaterials] = useState<Material[]>();
  const [material, setMaterial] = useState<Material>();
  const { product, order_stakeholder } = useAppSelector(
    (state) => state.orderData
  );
  console.log(product);
  console.log(profileList);
  const handleChangeCheckBox = (
    event: React.ChangeEvent<HTMLInputElement>,
    material: Material
  ) => {
    setMaterials((prevState) =>
      prevState.map((item) =>
        item.material === material.material
          ? { ...item, checked: event.target.checked }
          : item
      )
    );
    material.checked = event.target.checked;
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {};

  const next = () => {
    handleClose();
    handleOpen();
  };

  const handleMaterialSelected = (
    event: React.SyntheticEvent,
    material: Material | undefined,
    reason: AutocompleteChangeReason
  ) => {
    if (material) {
      let temp = [...materials, material];
      setMaterials(temp);
      setAvailableUnits(material.unit);
      setUnit(material.unit[0]);
    } else {
      setAvailableUnits([]);
      setUnit(undefined);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | {}>,
    value: Unit | null
  ) => {
    if (value) {
      setUnit(value);
    }
  };

  const RenderItems = (items: Order_Stakeholder[]) => {
    return (
      <>
        {items.map((item, i) => (
          <Row key={i} {...item} />
        ))}
      </>
    );
  };

  return (
    <>
      <Button sx={{ marginBottom: 2 }} variant="contained" onClick={handleOpen}>
        Add Stakeholder
      </Button>
      <BaseStepper isDisabled={false} handleConfirm={handleConfirm}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Address</TableCell>
                <TableCell>Validation</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{RenderItems(order_stakeholder)}</TableBody>
          </Table>
        </TableContainer>
        <FormDialog
          title="Add New Stakeholder"
          isDisabled={addressWallet && role && quantity ? false : true}
          handleClose={handleClose}
          open={open}
          confirm={next}
        >
          <Box
            sx={{
              display: "flex",
              marginTop: 2,
              width: 500,
              justifyContent: "space-between",
            }}
          >
            <TextField
              value={addressWallet}
              label="Address"
              required
              onChange={(event) => setAddressWallet(event.target.value)}
              sx={{ width: 320 }}
            />
            <Autocomplete
              // isOptionEqualToValue={(option, value) => option?.role == value.role}
              options={ROLE}
              getOptionLabel={(r) => `${r.role}`}
              value={role}
              onChange={(event, value) => {
                if (value) setRoleAddress(value);
                console.log(role);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Role"
                  required
                  sx={{ width: 150 }}
                />
              )}
            />
          </Box>
          {addressWallet && role && (
            <FormGroup>
              <Typography>
                {role.role === "Supplier" ? "Materials" : "Products"}
              </Typography>
            </FormGroup>
          )}
        </FormDialog>
      </BaseStepper>
    </>
  );
}
