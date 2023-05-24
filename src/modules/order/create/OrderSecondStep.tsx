import { Box, TextField, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setNextDisabled } from "../../../redux/order/orderCreateSlice";
import useNotify from "../../../hooks/useNotify";

interface Product {
  id: number;
  name: string;
  price: string;
  material: string;
}

const products: Product[] = [
  { id: 1, name: "Product A", price: "$10/kg", material: "Material X" },
  { id: 2, name: "Product B", price: "$20/ton", material: "Material Y" },
  { id: 3, name: "Product C", price: "$5/m", material: "Material Z" },
];

export default function OrderSecondStep() {

  const dispatch = useAppDispatch();
  const { finishedStep } = useAppSelector((state) => state.orderCreate);
  const { successNotify } = useNotify(); // using custom hook for notifications

    const [selectedProduct, setSelectedProduct] = React.useState<Product>();
    const [notes, setNotes] = React.useState("");
    const [quantity, setQuantity] = React.useState<number>();
    const [unit, setUnit] = React.useState("kg");

  // when user selects an option from autocomplete, dispatch action to enable next step and show success notification
  const handleSelect = (
    event: React.ChangeEvent<{}>,
    newValue: string | null
  ) => {
    setValue(newValue);
    if (newValue) {
      dispatch(setNextDisabled(false));
      successNotify("Selected product ID."); // show success notification
    }
  };
  console.log(`finish step: ${finishedStep}`);
  const renderResult = () => {
    if (finishedStep === 1) {
      return (
        <Box display="flex" flexDirection="column">
          <Autocomplete
            options={products}
            getOptionLabel={(product) =>
              `${product.id} - ${product.name} (${product.price})`
            }
            value={selectedProduct}
            onChange={(event, product) => setSelectedProduct(product)}
            renderInput={(params) => (
              <TextField {...params} label="Product" required />
            )}
          />
          <TextField
            label="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
          <TextField
            label="Quantity"
            type="number"
            value={quantity ?? ""}
            onChange={(e) => setQuantity(Number(e.target.value))}
            required
          />
          <TextField />
          {/* <Button variant="contained" color="primary" type="submit">
            Submit
          </Button> */}
        </Box>
      );
    }
  };
  return(
	<Box>
		{renderResult()}
	</Box>
  );
}
