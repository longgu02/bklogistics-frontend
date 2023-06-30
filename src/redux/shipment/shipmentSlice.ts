import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ShipmentCreateState{
    shipmentId: number;
    orderId: number;
    from: string;
    carrier: string;
    to: string;
    item: number[];
    pickupDate: Date;
}

const initialState: ShipmentCreateState = {
    shipmentId: 0,
    orderId: 0,
    from: "",
    carrier: "",
    to: "",
    item: [],
    pickupDate: new Date(),
};

export const shipmentCreateSlice = createSlice({
  name: "shipmentCreate",
  initialState: initialState,
  reducers: {
    setOrderId: (state, action: PayloadAction<number>) => {
      state.orderId = action.payload;
    },
    setFrom: (state, action: PayloadAction<string>) => {
      state.from = action.payload;
    },
    setTo: (state, action: PayloadAction<string>) => {
      state.to = action.payload;
    },
    setCarrier: (state, action: PayloadAction<string>) => {
      state.carrier = action.payload;
    },
    setItem: (state, action: PayloadAction<number[]>) => {
      state.item = action.payload;
    },
    setShipmentId : (state, action: PayloadAction<number>) => {
      state.shipmentId = action.payload;
    },
  },
});

export const {
    setCarrier,
    setFrom,
    setItem,
    setOrderId,
    setTo,
    setShipmentId
} = shipmentCreateSlice.actions;

export default shipmentCreateSlice.reducer;