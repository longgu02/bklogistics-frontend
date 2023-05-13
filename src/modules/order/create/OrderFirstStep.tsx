import { Box, TextField, Alert, Stack } from "@mui/material";
export default function OrderFirstStep() {
	return (
		<Stack>
			<Alert severity="error" sx={{ backgroundColor: "#FDEDED" }}>
				This is an error alert — check it out!
			</Alert>
			<Alert severity="warning" sx={{ backgroundColor: "#FFF4E5" }}>
				This is a warning alert — check it out!
			</Alert>
			<Alert severity="info" sx={{ backgroundColor: "#E5F6FD" }}>
				This is an info alert — check it out!
			</Alert>
			<Alert severity="success" sx={{ backgroundColor: "#EDF7ED" }}>
				This is a success alert — check it out!
			</Alert>
		</Stack>
	);
}
