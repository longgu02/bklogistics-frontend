import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
	address?: string;
	name?: string;
	contact?: string;
};

const initialState: UserState = {
	address: undefined,
	name: undefined,
	contact: undefined,
};

export const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<UserState>) => {
			state.address = action.payload.address;
			state.name = action.payload.name;
			state.contact = action.payload.contact;
		},
	},
});

export const { updateUser } = userSlice.actions;

export default userSlice.reducer;
