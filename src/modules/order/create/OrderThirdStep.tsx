import { Box, TextField, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setNextDisabled } from "../../../redux/order/orderCreateSlice";
import useNotify from "../../../hooks/useNotify";

interface Supplier {
  address: string;
}

const suppliers: Supplier[] = [
  {
    address: "address1",
  },
  {
    address: "address2",
  },
  {
    address: "address3",
  },
];

interface Manufacturer {
  address: string;
}

const manufacturers: Manufacturer[] = [
  {
    address: "address1",
  },
  {
    address: "address2",
  },
  {
    address: "address3",
  },
];

export default function OrderThirdStep() {
  const dispatch = useAppDispatch();
  const { successNotify } = useNotify(); // using custom hook for notifications
  const [selectedSupplier, setSelectedSupplier] = React.useState<Supplier>();
  const [selectedManufacturer, setSelectedManufacturer] =
    React.useState<Manufacturer>();
  const handleNextClick = () => {
    if (selectedSupplier && selectedManufacturer) {
      dispatch(setNextDisabled(false));
      successNotify("Third step details saved successfully!");
    }
  };
  dispatch(setNextDisabled(false));
  console.log(order.data);
  return (
    <Box >
      <Autocomplete
        options={suppliers}
        getOptionLabel={(option: Supplier) => option.address}
        onChange={(event, value) => setSelectedSupplier(value)}
        renderInput={(params) => (
          <TextField {...params} label="Supplier" required />
        )}
      />
      <Autocomplete
        options={manufacturers}
        getOptionLabel={(option: Manufacturer) => option.address}
        onChange={(event, value) => setSelectedManufacturer(value)}
        renderInput={(params) => (
          <TextField {...params} sx={{marginTop: 2}} label="Manufacturer" required />
        )}
      />
    </Box>
  );
}
