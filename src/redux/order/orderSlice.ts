import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Unit } from "../unit/unitModel";
import { Material } from "../material/materialSlice";
import useNotify from "../../hooks/useNotify";
export enum Status {
  PENDING = "pending",
  IN_PROGRESS = "progress",
  SUCCESS = "success",
  FAILED = "failed",
  CANCELED = "cancelled",
}

export interface Rq_Material {
  material: Material;
  quantity: number;
}
export interface Product {
  id: number;
  name: string;
  price: number;
  rq_material: Rq_Material[];
  description?: string; // Change the type to an array of Unit or null
}
export interface Supplier {
  address: string;
}
export interface Manufacturer {
  address: string;
}

interface Order_Stakeholder {
  addressWallet: string;
  role: string;
  supplier_material?: Material[];
  manufacturer_product?: Product[];
}

export interface Order {
  product: Product;
  status: Status;
  is_paid?: boolean;
  deposit_amount: number;
  customer_address: string;
  order_stakeholder: Order_Stakeholder[];
}

const initialState: Order = {
  product: {
    id: 0,
    name: "",
    price: 0,
    rq_material: [],
  },
  status: Status.PENDING,
  deposit_amount: 20,
  customer_address: "",
  order_stakeholder: [],
};
const { successNotify, errorNotify } = useNotify();
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    addOrder_RQ_material: (state, action: PayloadAction<Rq_Material>) => {
      const index = state.product.rq_material.findIndex(
        (material) =>
          material.material.material_id === action.payload.material.material_id
      );
      if (index === -1) state.product.rq_material.push(action.payload);
      else errorNotify("Material already added!");
    },
    updateOrder_RQ_material: (state, action: PayloadAction<Rq_Material>) => {
      const index = state.product.rq_material.findIndex(
        (material) =>
          material.material.material_id === action.payload.material.material_id
      );
      if (index !== -1) {
        state.product.rq_material[index] = action.payload;
      }
    },
    deleteOrder_RQ_material: (state, action: PayloadAction<Rq_Material>) => {
      const index = state.product.rq_material.findIndex(
        (material) =>
          material.material.material_id === action.payload.material.material_id
      );
      if (index !== -1) {
        state.product.rq_material.splice(index, 1);
      }
    },
    updateOrder_Product: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
    },
    deleteOrder_Product: (state) => {
      state.product.id = 0;
      state.product.name = "";
      if (state.product.description) state.product.description = "";
      state.product.rq_material = [];
    },
    updateStatus: (state, action: PayloadAction<Status>) => {
      state.status = action.payload;
    },
    updateCustomer: (state, action: PayloadAction<string>) => {
      state.customer_address = action.payload;
    },
    updateDeposit: (state, action: PayloadAction<number>) => {
      state.deposit_amount = action.payload;
    },
    createOrder: (
      state,
      action: PayloadAction<{
        product: Product;
        customer: string;
        order_stakeholder: Order_Stakeholder[];
      }>
    ) => {
      state.product = action.payload.product;
      state.customer_address = action.payload.customer;
      state.is_paid = false;
      state.order_stakeholder = action.payload.order_stakeholder;
    },
    addStakeholder: (state, action: PayloadAction<Order_Stakeholder>) => {
      state.order_stakeholder.push(action.payload);
    },
    updateStakeholder: (state, action: PayloadAction<Order_Stakeholder>) => {
      const index = state.order_stakeholder.findIndex(
        (holder) => holder.addressWallet === action.payload.addressWallet
      );
      if (index !== -1) state.order_stakeholder[index] = action.payload;
    },
    deleteStakeholder: (state, action: PayloadAction<Order_Stakeholder>) => {
      const index = state.order_stakeholder.findIndex(
        (holder) => holder.addressWallet === action.payload.addressWallet
      );
      if (index !== -1) state.order_stakeholder.splice(index, 1);
      else errorNotify("Not found");
    },
  },
});

export const {
  addOrder_RQ_material,
  addStakeholder,
  updateCustomer,
  updateDeposit,
  updateOrder_Product,
  updateOrder_RQ_material,
  updateStakeholder,
  updateStatus,
  deleteOrder_Product,
  deleteOrder_RQ_material,
  deleteStakeholder,
  createOrder,
} = orderSlice.actions;
export default orderSlice.reducer;
