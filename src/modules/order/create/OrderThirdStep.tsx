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
  Divider,
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
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import useNotify, { errorNotify } from "../../../hooks/useNotify";
import { addSupplier, addManufacturer } from "../../../redux/order/orderSlice";
import {
  Holder,
  Item,
  RequireMaterial,
  Product,
} from "../../../types";
type Address = {
  address: string;
};
type ItemHolder = {
  id: number;
  holderAddress: Address[];
};

const materialHolderList: ItemHolder[] = [
  {
    id: 1,
    holderAddress: [
      {
        address: "0x1234567890abcdef1234567890abcdef12345678",
      },
      {
        address: "0xabcdef1234567890abcdef1234567890abcdef12",
      },
      {
        address: "0x4567890abcdef1234567890abcdef1234567890ab",
      },
    ],
  },
  {
    id: 2,
    holderAddress: [
      {
        address: "0x9876543210fedcba9876543210fedcba98765432",
      },
      {
        address: "0xfedcba9876543210fedcba9876543210fedcba98",
      },
      {
        address: "0x567890abcdef1234567890abcdef1234567890ab",
      },
    ],
  },
  {
    id: 3,
    holderAddress: [
      {
        address: "0xabcdef1234567890abcdef1234567890abcdef12",
      },
      {
        address: "0x1234567890abcdef1234567890abcdef12345678",
      },
    ],
  },
  {
    id: 4,
    holderAddress: [
      {
        address: "0xabcdef1234567890abcdef1234567890abcdef12",
      },
      {
        address: "0x4567890abcdef1234567890abcdef1234567890ab",
      },
      {
        address: "0x9876543210fedcba9876543210fedcba98765432",
      },
      {
        address: "0xfedcba9876543210fedcba9876543210fedcba98",
      },
    ],
  },
  {
    id: 5,
    holderAddress: [
      {
        address: "0x1234567890abcdef1234567890abcdef12345678",
      },
      {
        address: "0x567890abcdef1234567890abcdef1234567890ab",
      },
    ],
  },
];

const supplierList: Holder[] = [
  {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    item: [
      { id: 1, price: 2 },
      { id: 3, price: 1 },
      { id: 5, price: 1 },
    ],
  },
  {
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    item: [
      { id: 1, price: 3 },
      { id: 3, price: 2 },
      { id: 4, price: 3 },
    ],
  },
  {
    address: "0x4567890abcdef1234567890abcdef1234567890ab",
    item: [
      { id: 1, price: 1 },
      { id: 4, price: 3 },
    ],
  },
  {
    address: "0x9876543210fedcba9876543210fedcba98765432",
    item: [
      { id: 2, price: 2 },
      { id: 4, price: 2 },
    ],
  },
  {
    address: "0xfedcba9876543210fedcba9876543210fedcba98",
    item: [
      { id: 2, price: 1 },
      { id: 4, price: 2 },
    ],
  },
  {
    address: "0x567890abcdef1234567890abcdef1234567890ab",
    item: [
      { id: 2, price: 3 },
      { id: 5, price: 3 },
    ],
  },
];

const manufacturerList: Holder[] = [
  {
    address: "0x1234567890abcdef1234567890abcdef12345678",
    item: [{ id: 1, price: 1 }],
  },
  {
    address: "0xabcdef1234567890abcdef1234567890abcdef12",
    item: [
      { id: 1, price: 1 },
      { id: 3, price: 2 },
    ],
  },
  {
    address: "0x4567890abcdef1234567890abcdef1234567890ab",
    item: [
      { id: 2, price: 2 },
      { id: 4, price: 1 },
    ],
  },
  {
    address: "0x9876543210fedcba9876543210fedcba98765432",
    item: [
      { id: 2, price: 1 },
      { id: 5, price: 3 },
    ],
  },
  {
    address: "0xfedcba9876543210fedcba9876543210fedcba98",
    item: [{ id: 2, price: 2 }],
  },
];
const productHolderList: ItemHolder[] = [
  {
    id: 1,
    holderAddress: [
      {
        address: "0x1234567890abcdef1234567890abcdef12345678",
      },
      {
        address: "0xabcdef1234567890abcdef1234567890abcdef12",
      },
    ],
  },
  {
    id: 2,
    holderAddress: [
      {
        address: "0x4567890abcdef1234567890abcdef1234567890ab",
      },
      {
        address: "0x9876543210fedcba9876543210fedcba98765432",
      },
      {
        address: "0xfedcba9876543210fedcba9876543210fedcba98",
      },
    ],
  },
  {
    id: 3,
    holderAddress: [
      {
        address: "0x567890abcdef1234567890abcdef1234567890ab",
      },
      {
        address: "0xabcdef1234567890abcdef1234567890abcdef12",
      },
      {
        address: "0x1234567890abcdef1234567890abcdef12345678",
      },
    ],
  },
  {
    id: 4,
    holderAddress: [
      {
        address: "0xabcdef1234567890abcdef1234567890abcdef12",
      },
      {
        address: "0x4567890abcdef1234567890abcdef1234567890ab",
      },
    ],
  },
  {
    id: 5,
    holderAddress: [
      {
        address: "0x9876543210fedcba9876543210fedcba98765432",
      },
      {
        address: "0xfedcba9876543210fedcba9876543210fedcba98",
      },
    ],
  },
];

type RowProps = {
  holder: Holder;
  name?: string;
  role: string;
  validation?: boolean;
  address?: string;
  rqMaterial?: RequireMaterial[];
  product?: Product;
};
function Row(props: RowProps) {
  const { name, address, role, validation, holder, rqMaterial, product } =
    props;
  const [open, setOpen] = useState(false);

  const total = () => {
    let _total = 0;
    if (role === "Supplier") {
      holder.item.forEach((material) =>
        rqMaterial?.forEach((rq) => {
          if (rq.materialId === material.id)
            _total += rq.quantity * material.price;
        })
      );
    } else holder.item.forEach((material) => (_total += material.price));
    return _total;
  };

  const RenderItem = (item: Item, rq: RequireMaterial[]) => {
    const index = rq.findIndex((rq) => rq.materialId === item.id);
    return (
      <>
        <TableRow key={rq[index].materialId}>
          <TableCell>{rq[index].name}</TableCell>
          <TableCell>{item.price}</TableCell>
          <TableCell>{rq[index].quantity}</TableCell>
          <TableCell>{rq[index].unit}</TableCell>
          <TableCell>{rq[index].quantity * item.price}</TableCell>
        </TableRow>
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
        <TableCell>{formatAddress(holder.address, 5)}</TableCell>
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
              <TableBody>
                {role === "Supplier" ? (
                  rqMaterial &&
                  holder.item.map((i) => RenderItem(i, rqMaterial))
                ) : (
                  <TableRow key={holder.item[0].id}>
                    <TableCell>{product?.name}</TableCell>
                    <TableCell>{holder.item[0].price}</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>{holder.item[0].price * 1}</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </>
  );
}

type CheckRowProps = {
  id: number;
  title: string;
  itemsHolder: ItemHolder[];
  role: boolean;
};

export default function OrderThirdStep() {
  const dispatch = useAppDispatch();
  const { successNotify, errorNotify } = useNotify();
  const [open, setOpen] = useState(false);
  const { product, requireMaterial } = useAppSelector(
    (state) => state.orderData
  );
  const {address} = useAppSelector((state) => state.wallet);
  let suppliers: Holder[] = [];
  let manufacturer: Holder[] = [];
  const [sup, setSup] = useState<Holder[]>();
  const [manu, setManu] = useState<Holder[]>();
  const handleSearch = (id: number, itemHolder: ItemHolder[]) => {
    let temp: Address[] = [];
    itemHolder.forEach((item) => {
      if (item.id === id) temp = item.holderAddress;
    });
    return temp;
  };
  function CheckRow(props: CheckRowProps) {
    const { id, itemsHolder, title, role } = props;
    const addressWallet: Address[] = handleSearch(id, itemsHolder);
    const [prevAddress, setPrevAddress] = useState<Address>({ address: "" });
    const [check, setCheck] = useState<boolean>(false);
    const getPrice = (id: number, address: String) => {
      let temp: Holder[] = [];
      let price: number = 0;
      if (role) temp = supplierList;
      else temp = manufacturerList;
      temp.forEach((item) => {
        if (item.address === address) {
          item.item.forEach((i) => {
            if (i.id === id) price = i.price;
          });
        }
      });
      return price;
    };
    const handleAddressChange1 = (
      event: React.SyntheticEvent,
      value: Address | null
    ) => {
      if (value) {
        if (suppliers.length > 0 && prevAddress.address !== "") {
          let index = suppliers.findIndex(
            (e) => e.address === prevAddress.address
          );
          if (suppliers[index].item.length === 1) suppliers.splice(index, 1);
          else if (suppliers[index].item.length > 1) {
            let indexItem = suppliers[index].item.findIndex((e) => e.id === id);
            suppliers[index].item.splice(indexItem, 1);
          }
        }
        let index = suppliers.findIndex((e) => e.address === value.address);
        if (index !== -1) {
          suppliers[index].item.push({
            id: id,
            price: getPrice(id, value.address),
          });
        } else
          suppliers.push({
            address: value.address,
            item: [
              {
                id: id,
                price: getPrice(id, value.address),
              },
            ],
          });
        setPrevAddress(value);
      }
      console.log(suppliers);
    };
    const handleAddressChange2 = (
      event: React.SyntheticEvent,
      value: Address | null
    ) => {
      if (value) {
        manufacturer = [
          {
            address: value.address,
            item: [
              {
                id: id,
                price: getPrice(id, value.address),
              },
            ],
          },
        ];
        setPrevAddress(value);
      }
      console.log(manufacturer);
    };
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 2,
          marginLeft: 2,
        }}
      >
        <Typography variant="body1" sx={{ width: 150 }}>
          {title}
        </Typography>
        <Autocomplete
          isOptionEqualToValue={(option, value) =>
            option.address == value.address
          }
          options={addressWallet}
          getOptionLabel={(r) => `${r.address}`}
          value={prevAddress}
          onChange={role ? handleAddressChange1 : handleAddressChange2}
          disabled={check}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Address"
              required
              sx={{ width: 300 }}
            />
          )}
        />
        <FormControlLabel
          label="I do"
          control={
            <Checkbox
              checked={check}
              onChange={() => {
                setCheck(!check);
                if(!check) setPrevAddress({ address: address });
                else setPrevAddress({ address: ''});
              }}
            />
          }
        />
      </Box>
    );
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (sup && manu) {
      dispatch(addSupplier(sup));
      dispatch(addManufacturer(manu));
      successNotify("Successfully added");
    } else {
      errorNotify("Failed to add");
    }
  };

  const next = () => {
    setSup(suppliers);
    setManu(manufacturer);
    handleClose();
  };

  const RenderItems = (item1: Holder[], item2: Holder[]) => {
    return (
      <>
        {item1.map((item, i) => (
          <Row
            key={i}
            holder={item}
            role="Supplier"
            rqMaterial={requireMaterial}
            validation={true}
          />
        ))}
        {item2.map((item, i) => (
          <Row
            key={i}
            holder={item}
            role="Manufacturer"
            product={product}
            validation={true}
          />
        ))}
      </>
    );
  };
  return (
    <>
      <Button sx={{ marginBottom: 2 }} variant="contained" onClick={handleOpen}>
        Add Stakeholder
      </Button>
      <BaseStepper isDisabled={!manu || !sup} handleConfirm={handleConfirm}>
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
            <TableBody>{sup && manu && RenderItems(sup, manu)}</TableBody>
          </Table>
        </TableContainer>
        <FormDialog
          title="Add New Stakeholder"
          isDisabled={false}
          handleClose={handleClose}
          open={open}
          confirm={next}
        >
          <Box sx={{ width: 650 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              {" "}
              Manufacturer{" "}
            </Typography>
            <CheckRow
              id={product.id}
              title={product.name}
              role={false}
              itemsHolder={productHolderList}
            />
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              {" "}
              Supplier
            </Typography>
            {requireMaterial.map((item) => (
              <>
                <CheckRow
                  id={item.materialId}
                  title={item.name}
                  role={true}
                  itemsHolder={materialHolderList}
                  key={item.materialId}
                />
              </>
            ))}
          </Box>
        </FormDialog>
      </BaseStepper>
    </>
  );
}
