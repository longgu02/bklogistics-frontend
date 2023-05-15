import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { BrowserProvider, JsonRpcSigner, Provider, Signer } from "ethers";

export type WalletState = {
	address?: string;
	chainId?: string;
	provider?: BrowserProvider;
	signer?: JsonRpcSigner;
	balance?: number;
};

const initialState: WalletState = {
	address: undefined,
	chainId: undefined,
	provider: undefined,
	signer: undefined,
	balance: undefined,
};

export const walletSlice = createSlice({
	name: "wallet",
	initialState: initialState,
	reducers: {
		updateWallet: (state, action: PayloadAction<WalletState>) => {
			state.address = action.payload.address;
			state.chainId = action.payload.chainId;
			state.provider = action.payload.provider;
			state.signer = action.payload.signer;
			state.balance = action.payload.balance;
		},
		updateAddress: (state, action: PayloadAction<string>) => {
			state.address = action.payload;
		},
	},
});

export const { updateWallet, updateAddress } = walletSlice.actions;

export default walletSlice.reducer;
