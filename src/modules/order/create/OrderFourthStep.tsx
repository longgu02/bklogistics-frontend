import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
  tableCellClasses,
} from "@mui/material";
import { useAppSelector } from "../../../redux/hooks";
import BaseStepper from "../../../components/stepper/BaseStepper";
import { formatAddress } from "../../../utils";
import React from "react";
interface DATA {
  addressWallet: string;
  material: string[];
  total: number;
}

const Data: DATA[] = [
  {
    addressWallet: "0x1234567890abcdef",
    material: ["gold", "silver", "copper"],
    total: 1000,
  },
  {
    addressWallet: "0x0987654321fedcba",
    material: ["diamond", "gold", "silver"],
    total: 500,
  },
  {
    addressWallet: "0x5555555555555555",
    material: ["diamond", "gold", "silver", "copper"],
    total: 750,
  },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));


export default function OrderFourthStep() {
  const onTransactionClick = () => {
    throw new Error("Function not implemented.");
  };
  const [total, setTotal] = React.useState(() => {
    let _total = 0;
    Data.forEach((data) => (_total += data.total));
    return _total;
  });
  const { product, notes, quantity, supplierAddress, manufacturer } =
    useAppSelector((state) => state.orderData);

  const deposit = (p: number) =>{
    let d = (p/100)*total;
    return `${p}% (${d} ETH)`;
  }
  return (
    <BaseStepper isDisabled={false}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>Material/Product</StyledTableCell>
              <StyledTableCell>Total</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Data.map((row) => (
              <StyledTableRow key={row.addressWallet}>
                <StyledTableCell component="th" scope="row">
                  {formatAddress(row.addressWallet, 5)}
                </StyledTableCell>
                <StyledTableCell>{row.material.join(", ")}</StyledTableCell>
                <StyledTableCell>{row.total}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{marginTop: 4}}>
        <Typography variant="h6" sx={{ display: "flex" }}>
          Total:
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            {total} ETH
          </Typography>
        </Typography>
        <Typography variant="h6" sx={{ display: "flex", marginTop: 2 }}>
          Deposit:
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            {deposit(20)}
          </Typography>
        </Typography>
      </Box>
    </BaseStepper>
  );
}
