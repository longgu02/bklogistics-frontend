import {
  Box,
  Typography,
  Autocomplete,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useState } from "react";
import { Holder } from "../../../types";
import { useAppSelector } from "../../../redux/hooks";

interface CheckRowProps {
  id: number;
  title: string;
  addressWallet: Address[];
  role: boolean;
  suppliers: Holder[];
  manufacturers: Holder[];
}
interface Address {
  address: string;
  price: number;
}
interface ItemHolder {
  id: number;
  holderAddress: Address[];
}

export default function CheckRow(props: CheckRowProps) {
  const { id, addressWallet, title, role, suppliers, manufacturers } = props;
  console.log(
    "🚀 ~ file: CheckRow.tsx:32 ~ CheckRow ~ suppliers, manufacturers:",
    suppliers,
    manufacturers
  );
  const { address, signer, chainId } = useAppSelector((state) => state.wallet);
  const [prevAddress, setPrevAddress] = useState<Address>({
    address: "",
    price: 0,
  });
  const [check, setCheck] = useState<boolean>(false);
  const handleIDo = () => {
    if (role) {
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
      let index = suppliers.findIndex((e) => e.address === address);
      if (index !== -1) {
        suppliers[index].item.push({
          id: id,
          price: 0,
        });
      } else
        suppliers.push({
          address: address,
          item: [
            {
              id: id,
              price: 0,
            },
          ],
        });
    } else {
      if (manufacturers.length > 0) manufacturers.splice(0, 1);
      manufacturers.push({
        address: address,
        item: [
          {
            id: id,
            price: 0,
          },
        ],
      });
    }
    setPrevAddress({
      address: address,
      price: 0,
    });
  };
  const handleAddressChange1 = (
    event: React.SyntheticEvent,
    value: Address | null
  ) => {
    if (value) {
      if (suppliers.length > 0) {
        let index: number;
        if (prevAddress.address !== "")
          index = suppliers.findIndex((e) => e.address === prevAddress.address);
        else index = suppliers.findIndex((e) => e.address === address);
        if (index !== -1) {
          if (suppliers[index].item.length === 1) suppliers.splice(index, 1);
          else if (suppliers[index].item.length > 1) {
            let indexItem = suppliers[index].item.findIndex((e) => e.id === id);
            suppliers[index].item.splice(indexItem, 1);
          }
        }
      }
      let index = suppliers.findIndex((e) => e.address === value.address);
      if (index !== -1) {
        suppliers[index].item.push({
          id: id,
          price: value.price,
        });
      } else
        suppliers.push({
          address: value.address,
          item: [
            {
              id: id,
              price: value.price,
            },
          ],
        });
      setPrevAddress(value);
    }
  };
  const handleAddressChange2 = (
    event: React.SyntheticEvent,
    value: Address | null
  ) => {
    if (value) {
      if (manufacturers.length > 0) manufacturers.splice(0, 1);
      manufacturers.push({
        address: value.address,
        item: [
          {
            id: id,
            price: value.price,
          },
        ],
      });
      setPrevAddress(value);
    }
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
          <TextField {...params} label="Address" required sx={{ width: 300 }} />
        )}
      />
      <FormControlLabel
        label="I do"
        control={
          <Checkbox
            checked={check}
            onChange={() => {
              setCheck(!check);
              if (!check) handleIDo();
              else setPrevAddress({ address: "", price: 0 });
            }}
          />
        }
      />
    </Box>
  );
}
