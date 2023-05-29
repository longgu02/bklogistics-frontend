import { Box, TextField, Button } from "@mui/material";
import Autocomplete, { AutocompleteChangeDetails, AutocompleteChangeReason } from "@mui/material/Autocomplete";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setNextDisabled } from "../../../redux/order/orderCreateSlice";
import useNotify from "../../../hooks/useNotify";
import {Unit, setProduct, getOrderData, Order, Product} from "../../../redux/order/orderSlice";

const products: Product[] = [
  {
    id: 1,
    name: "Product A",
    price: 10,
    material: "Material X",
    unit: [Unit.KILOGRAM, Unit.TONNE],
  },
  {
    id: 2,
    name: "Product B",
    price: 20,
    material: "Material Y",
    unit: [Unit.KILOGRAM, Unit.TONNE],
  },
  {
    id: 3,
    name: "Product C",
    price: 5,
    material: "Material Z",
    unit: [Unit.METER],
  },
];

export default function OrderSecondStep() {
  const dispatch = useAppDispatch();
  const { finishedStep } = useAppSelector((state) => state.orderCreate);
  const { successNotify } = useNotify();

  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
    );
    const [notes, setNotes] = React.useState("");
    const [quantity, setQuantity] = React.useState<number | null>(null);
    const [unit, setUnit] = React.useState<Unit>();
  const [availableUnits, setAvailableUnits] = React.useState<Unit[]>([]);
  
const handleProductSelected = (
  event: React.SyntheticEvent<Element, Event>,
  product: Product | null,
  reason: AutocompleteChangeReason,
  details?: AutocompleteChangeDetails<any> | undefined
) => {
  setSelectedProduct(product);
  console.log(selectedProduct);
  if (product) {
    setAvailableUnits(product.unit);
    setUnit(product.unit[0]);
  } else {
    setAvailableUnits([]);
    setUnit(undefined);
  }
};
  console.log(`finish step: ${finishedStep}`);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    console.log(selectedProduct, unit);
    event.preventDefault();
    if (
      selectedProduct &&
      quantity !== null &&
      unit && // check if `unit` itself is truthy, not its length
      notes.length > 0
    ) {
      dispatch(setNextDisabled(false));
      successNotify("You have selected a product");
      dispatch(setProduct(selectedProduct, unit));
      setNotes("");
      setQuantity(null);
    } else {
      dispatch(setNextDisabled(true));
    }
    console.log("Submitted form values: ", dispatch(getOrderData())); // Use `getOrderData()` instead of `order.data`
  };


  const renderResult = (): JSX.Element | null => {
    if (finishedStep === 1) {
      return (
        <Box>
          <form onSubmit={handleSubmit}>
            <Autocomplete
              options={products}
              getOptionLabel={(product) =>
                `${product.id} - ${product.name} (${product.price})`
              }
              value={selectedProduct}
              onChange={handleProductSelected}
              renderInput={(params) => (
                <TextField {...params} label="Product" required />
              )}
            />
            <TextField
              sx={{ marginTop: 2 }}
              fullWidth
              label="Notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              required
            />
            <Box sx={{ display: "flex", marginTop: 2 }}>
              <TextField
                sx={{}}
                label="Quantity"
                type="number"
                value={quantity ?? ""}
                onChange={(e) => setQuantity(Number(e.target.value))}
                required
              />
              <Autocomplete
                sx={{ marginLeft: 2 }}
                disableClearable
                freeSolo={false}
                disabled={!availableUnits.length}
                options={availableUnits.flat()}
                value={unit}
                onChange={(value) => setUnit(value)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    disabled
                    label="Unit"
                    sx={{ color: "black" }}
                  />
                )}
              />
            </Box>
            <Button
              sx={{ marginTop: 2 }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </Box>
      );
    }
    return null;
  };
  return <Box>{renderResult()}</Box>;
}
