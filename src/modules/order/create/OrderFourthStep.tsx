import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";

export default function OrderFourthStep() {
  const onTransactionClick = () => {
    throw new Error("Function not implemented.");
  };
  const { product, notes, quantity, supplierAddress, manufacturer } =
    useAppSelector((state) => state.orderData);
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Review Your Order
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell>Quantity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{product.name}</TableCell>
              <TableCell>{quantity}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="subtitle1" gutterBottom>
        Notes: {notes}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Supplier Address: {supplierAddress}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Manufacturer: {manufacturer}
      </Typography>
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
