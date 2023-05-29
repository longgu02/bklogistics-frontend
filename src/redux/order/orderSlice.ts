import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export enum Unit {
  KILOGRAM = "kg",
  TONNE = "t",
  METER = "m",
}
export interface Product {
  id: number;
  name: string;
  price: number;
  material: string;
  unit: Unit[] | null; // Change the type to an array of Unit or null
}
export interface Supplier {
  address: string;
}
export interface Manufacturer {
  address: string;
}
export interface Order {
  product: {
    id: number | null;
    name: string | null;
    price: number | null;
    material: string | null;
    unit: Unit | null;
  };
  notes: string | null;
  quantity: number | null;
  supplierAddress: string | null;
  manufacturer: string | null;
}

const initialState: Order = {
  product: {
    id: null,
    name: null,
    price: null,
    material: null,
    unit: null,
  },
  notes: "",
  quantity: null,
  supplierAddress: null,
  manufacturer: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    setProduct: (
      state,
      action: PayloadAction<{
        product: Product;
        unit: Unit;
        notes: string;
        quantity: number;
      }>
    ) => {
      state.product.id = action.payload.product.id;
      state.product.name = action.payload.product.name;
      state.product.price = action.payload.product.price;
      state.product.material = action.payload.product.material;
      state.product.unit = action.payload.unit;
      state.notes = action.payload.notes;
      state.quantity = action.payload.quantity;
    },
    setSupplier: (state, action: PayloadAction<Supplier>) => {
      state.supplierAddress = action.payload.address;
    },
    setManufacturer: (state, action: PayloadAction<Manufacturer>) => {
      state.manufacturer = action.payload.address;
    },
  },
});

export const { setProduct, setSupplier, setManufacturer} = orderSlice.actions;
export default orderSlice.reducer;
