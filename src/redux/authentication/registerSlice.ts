import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type RegisterState = {
	walletAddress?: string;
	companyName?: string;
	email?: string;
	phoneNumber?: string;
	website?: string;
	deliveryAddress?: string;
	shippingAddress?: string;
	profileImage?: string;
	coverImage?: string;
	description?: string;
	currentStep: number;
};

export type BasicInfo = {
	walletAddress: string;
	companyName: string;
};

export type ContactInfo = {
	email: string;
	phoneNumber: string;
	website: string;
	deliveryAddress: string;
	shippingAddress: string;
};

export type AdditionalInfo = {
	profileImage: string;
	coverImage: string;
	description: string;
};
const initialState: RegisterState = {
	walletAddress: "",
	companyName: "",
	email: "",
	phoneNumber: "",
	website: "",
	deliveryAddress: "",
	shippingAddress: "",
	profileImage: "",
	coverImage: "",
	description: "",
	currentStep: 1,
};

export const registerSlice = createSlice({
	name: "register",
	initialState: initialState,
	reducers: {
		updateFirstStep: (state, action: PayloadAction<BasicInfo>) => {
			state.companyName = action.payload.companyName;
			state.walletAddress = action.payload.walletAddress;
			state.currentStep = 2;
		},
		updateSecondStep: (state, action: PayloadAction<ContactInfo>) => {
			state.email = action.payload.email;
			state.phoneNumber = action.payload.phoneNumber;
			state.website = action.payload.website;
			state.deliveryAddress = action.payload.deliveryAddress;
			state.shippingAddress = action.payload.shippingAddress;
			state.currentStep = 3;
		},
		updateThirdStep: (state, action: PayloadAction<AdditionalInfo>) => {
			state.profileImage = action.payload.profileImage;
			state.coverImage = action.payload.coverImage;
			state.description = action.payload.description;
		},
		nextStep: (state) => {
			if (state.currentStep) {
				state.currentStep = state.currentStep + 1;
			}
		},
		prevStep: (state) => {
			if (state.currentStep) {
				state.currentStep = state.currentStep - 1;
			}
		},
		// updateUser: (state, action: PayloadAction<RegisterState>) => {
		// 	state.address = action.payload.address;
		// 	state.name = action.payload.name;
		// 	state.contact = action.payload.contact;
		// },
	},
});

export const { updateFirstStep, updateSecondStep, updateThirdStep } =
	registerSlice.actions;

export default registerSlice.reducer;
