import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  Order,
  RequireMaterial,
  Product,
  Status,
  Holder,
} from "../../types/index";

const initialState: Order = {
  product: {
    id: 0,
    name: "",
  },
  requireMaterial: [],
  status: Status.PENDING,
  deposit_amount: 20,
  customer_address: "",
  suppliers: [],
  manufacturer: [],
};
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    _addProduct : (state, action: PayloadAction<Product>) => {
      state.product.id = action.payload.id;
      state.product.name = action.payload.name;
    },
    addRequireMaterial: (state, action: PayloadAction<RequireMaterial[]>) => {
      state.requireMaterial.push(...action.payload);
    },
    addSupplier: (state, action: PayloadAction<Holder[]>) => {
      state.suppliers.push(...action.payload);
    },
    addManufacturer: (state, action: PayloadAction<Holder[]>) => {
      state.manufacturer.push(...action.payload);
    }
  },
});

export const {
  _addProduct,
  addRequireMaterial,
  addManufacturer,
  addSupplier,
} = orderSlice.actions;
export default orderSlice.reducer;
