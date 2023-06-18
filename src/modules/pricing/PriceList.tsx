import { Box, Grid, Paper, Stack } from "@mui/material";
import PricingRow from "./PricingRow";
import { PricingType } from "../../hooks/usePricingContract";

interface PriceListProps {
	products: Array<{
		productId: Number;
		type: PricingType;
		name: String;
	}>;
}

export default function PriceList(props: PriceListProps) {
	const { products } = props;
	return (
		<Box>
			<Box
				sx={{
					paddingLeft: "20px",
					paddingRight: "20px",
					mb: 1,
					fontWeight: 500,
				}}
			>
				<Grid container>
					<Grid item xs={2}>
						Product ID
					</Grid>
					<Grid item xs={2}>
						Name
					</Grid>
					<Grid item xs={2}>
						Type
					</Grid>
					<Grid item xs={2}>
						Price
					</Grid>
					<Grid item xs={1}>
						Unit
					</Grid>
					<Grid item xs={2}>
						Status
					</Grid>
					<Grid item xs={1}>
						Action
					</Grid>
				</Grid>
			</Box>
			<Box>
				<Stack spacing={1}>
					{products.map((product) => (
						// <Box key={product}>
						<PricingRow product={product} />
						// </Box>
					))}
				</Stack>
			</Box>
		</Box>
	);
}
