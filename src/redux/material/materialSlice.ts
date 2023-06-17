import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Unit } from "../unit/unitModel";
export interface Material {
  material_id: number;
  name: string;
  unit: Unit[];
  price: number;
}

const initialState: Material[] = [];

const materialSlice = createSlice({
    name: "material",
    initialState: initialState,
    reducers: {
        addMaterial: (state, action: PayloadAction<Material>) => {
            state.push(action.payload);
        },
        updateMaterial: (state, action: PayloadAction<Material>) => {
            const index = state.findIndex((material) => material.material_id === action.payload.material_id);
            if(index !== -1) {
                state[index] = action.payload;
            }
        },
        deleteMaterial: (state, action: PayloadAction<Material>) => {
            const index = state.findIndex((material) => material.material_id === action.payload.material_id);
            if(index !== -1) {
                state.splice(index, 1);
            }
        },
    }
});

export const {addMaterial, updateMaterial, deleteMaterial} = materialSlice.actions;
export default materialSlice.reducer;