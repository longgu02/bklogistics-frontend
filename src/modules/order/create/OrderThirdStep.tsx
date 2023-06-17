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
  setSupplier,
  setManufacturer,
  Supplier,
  Manufacturer,
  Unit,
} from "../../../redux/order/orderSlice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

interface DetailInfo {
  material: string;
  price: number;
  quantity: number;
  unit: string;
}

interface Stakeholder {
  address_wallet: string;
  validation?: boolean;
  role: string;
  name?: string;
  address?: string;
  detail?: DetailInfo[];
}

interface Role {
  role: string;
}

const RoleList: Role[] = [
  {
    role: "Supplier",
  },
  {
    role: "Manufacturer",
  },
];

const StakeholderData: Stakeholder[] = [
  {
    address_wallet: "0x1234567890abcdef",
    validation: true,
    role: "Supplier",
    name: "John Doe",
    address: "123 Main St, Anytown USA",
    detail: [
      {
        material: "Gold",
        price: 1000.0,
        quantity: 100,
        unit: "grams",
      },
      {
        material: "Silver",
        price: 500.0,
        quantity: 50,
        unit: "grams",
      },
    ],
  },
  {
    address_wallet: "0x0987654321fedcba",
    validation: false,
    role: "Manufacturer",
    name: "Jane Smith",
    address: "456 Oak Ave, Anytown USA",
    detail: [
      {
        material: "Copper",
        price: 2000.0,
        quantity: 200,
        unit: "grams",
      },
      {
        material: "Iron",
        price: 1500.0,
        quantity: 150,
        unit: "grams",
      },
    ],
  },
];

interface Material {
  material: string;
  unit: Unit[];
  checked?: boolean;
}

const MaterialList: Material[] = [
  {
    material: "gold",
    unit: [Unit.KILOGRAM, Unit.TONNE],
    checked: false,
  },
];

function Row(props: Stakeholder) {
  const { address_wallet, validation, role, name, address, detail } = props;
  const [open, setOpen] = useState(false);

  const total = () => {
    let _total = 0;
    if (detail) {
      detail.forEach((element) => {
        _total += element.price * element.quantity;
      });
    }
    return _total;
  };

  const RenderItem = (items: DetailInfo[] | undefined) => {
    return (
      <>
        {items &&
          items.map((item, i) => (
            <TableRow key={i}>
              <TableCell>{item.material}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.unit}</TableCell>
              <TableCell>{item.quantity * item.price}</TableCell>
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
        <TableCell>{formatAddress(address_wallet, 5)}</TableCell>
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
                  <TableCell>Material</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{RenderItem(detail)}</TableBody>
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
  const [addressWallet, setAddressWallet] = useState<string>();
  const [manufacturer, setManufacturerAddress] = useState<Manufacturer>();
  const [suppliers, setSuppliersAddress] = useState<Supplier[]>([]);
  const [role, setRoleAddress] = useState<Role>();
  const [manufacturers, setManufacturersAddress] = useState<Manufacturer[]>([]);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [unit, setUnit] = useState<Unit>();
  const [availableUnits, setAvailableUnits] = useState<Unit[]>([]);
  const [materials, setMaterials] = useState<Material[]>(MaterialList);
  const [material, setMaterial] = useState<Material>();

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

  const handleConfirm = () => {
    successNotify("Success!");
    dispatch(setSupplier(suppliers));
    dispatch(setManufacturer(manufacturers));
  };

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

  const product = useAppSelector((state) => state.orderData.product);

  const RenderItems = (items: Stakeholder[]) => {
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
            <TableBody>{RenderItems(StakeholderData)}</TableBody>
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
              options={RoleList}
              getOptionLabel={(r) => `${r.role}`}
              value={role}
              onChange={(event, value) => setRoleAddress(value)}
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
              {MaterialList.map((mte) => (
                <>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={mte.checked}
                        onChange={(event) => handleChangeCheckBox(event, mte)}
                      />
                    }
                    label={mte.material}
                    key={mte.material}
                  />
                  <Collapse in={mte.checked} timeout="auto" unmountOnExit>
                    <Box
                      sx={{
                        display: "flex",
                        marginTop: 2,
                        width: 500,
                        justifyContent: "space-between",
                      }}
                    >
                      <TextField
                        label="Quantity"
                        type="number"
                        required
                        value={quantity || ""}
                        onChange={(event) =>
                          setQuantity(Number(event.target.value))
                        }
                        sx={{ width: 100 }}
                      />
                      <Autocomplete
                        options={availableUnits}
                        getOptionLabel={(unit) => `${unit}`}
                        value={unit}
                        onChange={handleChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Unit"
                            required
                            sx={{ width: 150 }}
                          />
                        )}
                      />
                    </Box>
                  </Collapse>
                </>
              ))}
            </FormGroup>
          )}
        </FormDialog>
      </BaseStepper>
    </>
  );
}
