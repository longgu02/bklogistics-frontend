import { Box, Typography } from "@mui/material";

export default function CreateInvoice() {
	return (
		<Box>
			<Typography
				variant="h4"
				mb="5px"
				sx={{ fontWeight: 600, textAlign: "center" }}
			>
				Invoice
			</Typography>
			<Typography variant="subtitle1" mb="5px">
				<span style={{ fontWeight: 600 }}>Order ID: </span>
			</Typography>
			<Typography variant="subtitle1" mb="5px">
				<span style={{ fontWeight: 600 }}>From: </span>
			</Typography>
			<Typography variant="subtitle1" mb="5px">
				<span style={{ fontWeight: 600 }}>Carrier: </span>
			</Typography>
			<Typography variant="subtitle1" mb="5px">
				<span style={{ fontWeight: 600 }}>To: </span>
			</Typography>
			<Typography variant="subtitle1" mb="5px">
				<span style={{ fontWeight: 600 }}>Product/Material: </span>
			</Typography>
			<Typography variant="subtitle1" mb="5px">
				<span style={{ fontWeight: 600 }}>Pickup Date: </span>
			</Typography>
			<Typography variant="subtitle1" mb="5px">
				<span style={{ fontWeight: 600 }}>Cost: </span>
			</Typography>
		</Box>
	);
}
