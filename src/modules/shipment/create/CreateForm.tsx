import {
	Box,
	Collapse,
	Grid,
	Paper,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import CustomTextField from "../../../components/forms/theme-elements/CustomTextField";
import { useState } from "react";

const ORDER = [
	{ id: 1, customer: "0x696969", product: "Leather jacket" },
	{ id: 2, customer: "0x696969", product: "HIHI" },
	{ id: 2, customer: "0x696969", product: "HIHI" },
	{ id: 3, customer: "0x696969", product: "HEHE" },
];

export default function CreateForm() {
	const [suggestedOrder, setSuggestedOrder] = useState([]);
	const [orderInput, setOrderInput] = useState("");

	const handleChangeOrder = (e: any) => {
		setOrderInput(e.target.value);
		const filteredOrder = ORDER.filter((order) => order.id == e.target.value);
		setSuggestedOrder([...filteredOrder]);
	};

	return (
		<Box>
			<Stack spacing={1} sx={{ position: "relative" }}>
				<Typography
					variant="subtitle1"
					fontWeight={600}
					component="label"
					htmlFor="address"
				>
					Order ID
				</Typography>
				<Box>
					<CustomTextField
						type="address"
						variant="outlined"
						value={orderInput}
						onChange={(e: any) => handleChangeOrder(e)}
						fullWidth
					/>
					<Collapse in={suggestedOrder.length != 0}>
						<Paper
							sx={{
								borderRadius: 0,
								overFlowY: "scroll",
								maxHeight: 300,
							}}
						>
							{suggestedOrder.map((order) => (
								<Grid
									container
									sx={{
										cursor: "pointer",
										"&:hover": { backgroundColor: "#F5F7FA" },
									}}
									onClick={() => console.log("hehehe")}
								>
									<Grid item xs={4}>
										{order.id}
									</Grid>
									<Grid item xs={4}>
										{order.customer}
									</Grid>
									<Grid item xs={4}>
										{order.product}
									</Grid>
								</Grid>
							))}
						</Paper>
					</Collapse>
				</Box>
				<Typography
					variant="subtitle1"
					fontWeight={600}
					component="label"
					htmlFor="address"
				>
					Carrier
				</Typography>
				<CustomTextField type="address" variant="outlined" fullWidth />
				<Typography
					variant="subtitle1"
					fontWeight={600}
					component="label"
					htmlFor="address"
				>
					Receiver
				</Typography>
				<CustomTextField type="address" variant="outlined" fullWidth />
				<Typography
					variant="subtitle1"
					fontWeight={600}
					component="label"
					htmlFor="address"
				>
					Pickup Date
				</Typography>
				<CustomTextField type="address" variant="outlined" fullWidth />
			</Stack>
		</Box>
	);
}
