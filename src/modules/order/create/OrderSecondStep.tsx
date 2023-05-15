import { Box, TextField } from "@mui/material";
import * as React from "react";
import { useAppDispatch } from "../../../redux/hooks";
import { setNextDisabled } from "../../../redux/order/orderCreateSlice";
export default function OrderSecondStep() {
	const dispatch = useAppDispatch();
	return (
		<Box>
			<div>
				<TextField
					error
					fullWidth
					id="outlined-error-helper-text"
					label="Error"
					defaultValue="Hello World"
					helperText="Incorrect entry."
				/>
			</div>
		</Box>
	);
}
