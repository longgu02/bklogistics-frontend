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

const OrderRow = ({ obj: { id, name, price, quantity } }) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{name}</TableCell>
      <TableCell>{quantity}</TableCell>
      <TableCell>{price}</TableCell>
      <TableCell>
        <Button variant="contained" color="success">
          Accept
        </Button>
        <Button variant="outlined" color="error">
          Cancel
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default OrderRow;
