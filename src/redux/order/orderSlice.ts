import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {
  Order,
  Order_Stakeholder,
  Rq_Material,
  Product,
  Material,
  Status,
  Unit,
  Rq_Product,
} from "../../types/index";

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
const orderSlice = createSlice({
  name: "order",
  initialState: initialState,
  reducers: {
    addPr_RQ_material: (state, action: PayloadAction<Rq_Material>) => {
      const index = state.product.rq_material.findIndex(
        (material) =>
          material.material.material_id === action.payload.material.material_id
      );
      if (index === -1) state.product.rq_material.push(action.payload);
    },
    updatePr_RQ_material: (state, action: PayloadAction<Rq_Material>) => {
      const index = state.product.rq_material.findIndex(
        (material) =>
          material.material.material_id === action.payload.material.material_id
      );
      if (index !== -1) {
        state.product.rq_material[index] = action.payload;
      }
    },
    deletePr_RQ_material: (state, action: PayloadAction<Rq_Material>) => {
      const index = state.product.rq_material.findIndex(
        (material) =>
          material.material.material_id === action.payload.material.material_id
      );
      if (index !== -1) {
        state.product.rq_material.splice(index, 1);
      }
    },
    addOrder_Product: (state, action: PayloadAction<Product>) => {
      state.product = action.payload;
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
    },
    addStake_Rq_Product: (
      state,
      action: PayloadAction<{ pd: Rq_Product; addressWallet: string }>
    ) => {
      const index = state.order_stakeholder.findIndex(
        (stake) => stake.addressWallet === action.payload.addressWallet
      );
      if (index !== -1)
        state.order_stakeholder[index].manufacturer_product?.push(
          action.payload.pd
        );
    },
    updateStake_Rq_Product: (
      state,
      action: PayloadAction<{ pd: Rq_Product; addressWallet: string }>
    ) => {
      const index = state.order_stakeholder.findIndex(
        (stake) => stake.addressWallet === action.payload.addressWallet
      );
      if (index !== -1) {
        const i = state.order_stakeholder[
          index
        ].manufacturer_product?.findIndex(
          (product) => product.product.id === action.payload.pd.product.id
        );
        if (i !== -1) {
          state.order_stakeholder[index].manufacturer_product[i] =
            action.payload.pd;
        }
      }
    },
    deleteStake_Rq_Product: (
      state,
      action: PayloadAction<{ pd: Rq_Product; addressWallet: string }>
    ) => {
      const index = state.order_stakeholder.findIndex(
        (stake) => stake.addressWallet === action.payload.addressWallet
      );
      if (index !== -1) {
        const i = state.order_stakeholder[
          index
        ].manufacturer_product?.findIndex(
          (product) => product.product.id === action.payload.pd.product.id
        );
        if (i !== -1) {
          state.order_stakeholder[index].manufacturer_product?.splice(i, 1);
        }
      }
    },
    addStake_Rq_material: (state, action:PayloadAction<{mt: Rq_Material, addressWallet: string}>) => {
      const index = state.order_stakeholder.findIndex((stake) => stake.addressWallet === action.payload.addressWallet);
      if(index !== -1) {
        state.order_stakeholder[index].supplier_material?.push(action.payload.mt);
      }
    },
    updateStake_Rq_material: (state, action:PayloadAction<{mt: Rq_Material, addressWallet: string}>) => {
      const index = state.order_stakeholder.findIndex(
        (stake) => stake.addressWallet === action.payload.addressWallet
      );
      if(index !== -1){
        const i = state.order_stakeholder[index].supplier_material?.findIndex(
          (mte) =>
            mte.material.material_id === action.payload.mt.material.material_id
        );
        if (i !== -1) {
          state.order_stakeholder[index].supplier_material[i] = action.payload.mt;
        }
      }
    },
    deleteStake_Rq_material: (state, action:PayloadAction<{mt: Rq_Material, addressWallet: string}>) => {
      const index = state.order_stakeholder.findIndex(
        (stake) => stake.addressWallet === action.payload.addressWallet
      );
      if (index !== -1) {
        const i = state.order_stakeholder[index].supplier_material?.findIndex(
          (mte) =>
            mte.material.material_id === action.payload.mt.material.material_id
        );
        if (i !== -1) {
          state.order_stakeholder[index].supplier_material?.slice(i, 1);
        }
      }
    },
  },
});

export const {
  addPr_RQ_material,
  addStakeholder,
  updateCustomer,
  updateDeposit,
  updateOrder_Product,
  updatePr_RQ_material,
  updateStakeholder,
  updateStatus,
  deleteOrder_Product,
  deletePr_RQ_material,
  deleteStakeholder,
  createOrder,
  addOrder_Product,
  addStake_Rq_Product,
  addStake_Rq_material,
  updateStake_Rq_Product,
  updateStake_Rq_material,
  deleteStake_Rq_Product,
  deleteStake_Rq_material,
} = orderSlice.actions;
export default orderSlice.reducer;
