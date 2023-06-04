import { Box, TextField, Button } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setNextDisabled } from "../../../redux/order/orderCreateSlice";
import useNotify from "../../../hooks/useNotify";
import {
	Supplier,
	Manufacturer,
	setSupplier,
	setManufacturer,
} from "../../../redux/order/orderSlice";
import BaseStepper from "../../../components/stepper/BaseStepper";

const suppliers: Supplier[] = [
	{
		address: "address1",
	},
	{
		address: "address2",
	},
	{
		address: "address3",
	},
];

const manufacturers: Manufacturer[] = [
	{
		address: "address1",
	},
	{
		address: "address2",
	},
	{
		address: "address3",
	},
];

export default function OrderThirdStep() {
	const dispatch = useAppDispatch();
	const { successNotify } = useNotify(); // using custom hook for notifications
	const { supplierAddress, manufacturer } = useAppSelector(
		(state) => state.orderData
	);
	console.log(supplierAddress, manufacturer);
	dispatch(setNextDisabled(false));
	return (
		<BaseStepper>
			<Box>
				<Autocomplete
					options={suppliers}
					getOptionLabel={(option: Supplier) => option.address}
					onChange={(event, value) => dispatch(setSupplier(value))}
					renderInput={(params) => (
						<TextField {...params} label="Supplier" required />
					)}
				/>
				<Autocomplete
					options={manufacturers}
					getOptionLabel={(option: Manufacturer) => option.address}
					onChange={(event, value) => dispatch(setManufacturer(value))}
					renderInput={(params) => (
						<TextField
							{...params}
							sx={{ marginTop: 2 }}
							label="Manufacturer"
							required
						/>
					)}
				/>
			</Box>
		</BaseStepper>
	);
}
