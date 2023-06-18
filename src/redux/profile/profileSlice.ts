import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import {Profile, Material, Product} from '../../types/index';


const initialState: Profile = {
  profile_id: 0,
  wallet_address: "",
  name: "",
  email: "",
  contact_address: "",
  phone_number: 0,
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    createProfile: (state, action: PayloadAction<Profile>) => {
      state = action.payload;
    },
    updateProfile: (state, action: PayloadAction<Profile>) => {
      state = action.payload;
    },
    addPrMaterial: (state, action: PayloadAction<Material>) => {
      state.materialList?.push(action.payload);
    },
    updatePrMaterial: (state, action: PayloadAction<Material>) => {
      if (state.materialList) {
        const index = state.materialList.findIndex(
          (material) => material.material_id === action.payload.material_id
        );
        if (index !== -1) state.materialList[index] = action.payload;
      }
    },
    deletePrMaterial: (state, action: PayloadAction<Material>) => {
      if (state.materialList) {
        const index = state.materialList.findIndex(
          (material) => material.material_id === action.payload.material_id
        );
        if (index !== -1) state.materialList.splice(index, 1);
      }
    },
    addPrProduct: (state, action: PayloadAction<Product>) => {
      state.productList?.push(action.payload);
    },
    updatePrProduct: (state, action: PayloadAction<Product>) => {
      if (state.productList) {
        const index = state.productList.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) state.productList[index] = action.payload;
      }
    },
    deletePrProduct: (state, action: PayloadAction<Product>) => {
      if (state.productList) {
        const index = state.productList.findIndex(
          (product) => product.id === action.payload.id
        );
        if (index !== -1) state.productList.splice(index, 1);
      }
    },
  },
});
export const {
  createProfile,
  addPrMaterial,
  addPrProduct,
  deletePrMaterial,
  deletePrProduct,
  updatePrMaterial,
  updatePrProduct,
  updateProfile,
} = profileSlice.actions;
export default profileSlice.reducer;
