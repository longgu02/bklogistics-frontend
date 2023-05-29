import { Box, Button, Typography } from "@mui/material";

type Invoice = {
  address: string;
  price: number;
};

// type OrderFourthStepProps = {
//   invoices: Invoice[];
//   onTransactionClick: () => void;
// };

const invoices: Invoice[] = [
  {
    address: "123 Main St, Anytown USA",
    price: 30,
  },
  {
    address: "456 Elm Ave, Another City USA",
    price: 50,
  },
  {
    address: "789 Maple Blvd, A Third Town USA",
    price: 70,
  },
];

export default function OrderFourthStep() {
	const onTransactionClick = () => {
		throw new Error("Function not implemented.");
	}

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Review Your Order
      </Typography>
      {invoices.map((invoice) => (
        <Box key={invoice.address}>
          <div>{`${invoice.address}: ${invoice.price}`}</div>
        </Box>
      ))}
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={onTransactionClick}
        sx={{ mt: 2 }}
      >
        Confirm Purchase
      </Button>
    </Box>
  );
}
