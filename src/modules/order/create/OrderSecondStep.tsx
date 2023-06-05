import { Box, TextField, Button } from "@mui/material";
import Autocomplete, {
  AutocompleteChangeReason,
  createFilterOptions,
} from "@mui/material/Autocomplete";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setNextDisabled, nextStep } from "../../../redux/order/orderCreateSlice";
import useNotify from "../../../hooks/useNotify";
import { Unit, setProduct, Product } from "../../../redux/order/orderSlice";

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
  const finishedStep = useAppSelector(
    (state) => state.orderCreate.finishedStep
  );
  const { successNotify, errorNotify } = useNotify();

  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(
    null
  );
  const [notes, setNotes] = React.useState("");
  const [quantity, setQuantity] = React.useState<number | null>(null);
  const [unit, setUnit] = React.useState<Unit | null>(null);
  const [availableUnits, setAvailableUnits] = React.useState<Unit[]>([]);

  const handleProductSelected = (
    event: React.SyntheticEvent,
    product: Product | null,
    reason: AutocompleteChangeReason
  ) => {
    setSelectedProduct(product);
    if (product !== null) {
      setAvailableUnits(product.unit);
      setUnit(product.unit[0]);
    } else {
      setAvailableUnits([]);
      setUnit(null);
    }
  };

const handleChange = (
  event: React.ChangeEvent<HTMLInputElement | {}>,
  value: string | null
) => {
  setUnit(value); // Update the state using value
};
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (
      selectedProduct &&
      quantity !== null &&
      unit !== null
    ) {
      dispatch(nextStep());
      successNotify("You have selected a product");
      dispatch(setProduct({ product: selectedProduct, unit: unit , notes: notes, quantity: quantity}));
      setNotes("");
      setQuantity(null);
      setUnit(null);
    } else {
      dispatch(setNextDisabled(true));
    }
  };


  return (
    <Box>
      {finishedStep === 1 && (
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
          />
          <Box sx={{ display: "flex", marginTop: 2 }}>
            <TextField
              label="Quantity"
              type="number"
              value={quantity ?? ""}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val <= 0) {
                  errorNotify("Quantity cannot be less than or equal to zero");
                } else {
                  setQuantity(val);
                }
              }}
              required
            />
            <Autocomplete
              sx={{ marginLeft: 2 }}
              disableClearable
              freeSolo={false}
              disabled={!availableUnits.length}
              options={availableUnits.flat()}
              value={unit !== null ? unit : undefined} // Ensure that value is not null
              onChange={handleChange} // pass the defined method
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
      )}
    </Box>
  );
}
