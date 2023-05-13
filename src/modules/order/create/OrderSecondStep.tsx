import { Box } from "@mui/material";

export default function OrderSecondStep() {
	return (
		<Box>
			<div>
				<TextField
					error
					id="outlined-error-helper-text"
					label="Error"
					defaultValue="Hello World"
					helperText="Incorrect entry."
				/>
			</div>
		</Box>
	);
}
