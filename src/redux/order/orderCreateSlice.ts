import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface OrderCreateState {
	selectedStep: number;
	currentStep: number;
	finishedStep: number;
	isNextDisabled: boolean;
}

const initialState: OrderCreateState = {
	selectedStep: 1,
	currentStep: 1,
	finishedStep: 0,
	isNextDisabled: true,
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
		setNextDisabled: (state, action: PayloadAction<boolean>) => {
			state.isNextDisabled = action.payload;
		},
	},
});

export const { nextStep, selectStep, setNextDisabled } =
	orderCreateSlice.actions;

export default orderCreateSlice.reducer;
