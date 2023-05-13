import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OrderCreateState {
	selectedStep: number;
	currentStep: number;
	finishedStep: number;
}

const initialState: OrderCreateState = {
	selectedStep: 1,
	currentStep: 1,
	finishedStep: 0,
};

export const orderCreateSlice = createSlice({
	name: "orderCreate",
	initialState: initialState,
	reducers: {
		nextStep: (state) => {
			state.selectedStep = state.currentStep + 1;
			state.currentStep++;
			state.finishedStep++;
		},
		selectStep: (state, action: PayloadAction<number>) => {
			state.selectedStep = action.payload;
		},
	},
});

export const { nextStep, selectStep } = orderCreateSlice.actions;

export default orderCreateSlice.reducer;
