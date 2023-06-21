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
import { Holder, RequireMaterial } from "../../../types";
import useProductContract from "../../../hooks/useProductContract";
interface DATA {
  addressWallet: string;
  material: string[];
  total: number;
}



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
  const { signer, chainId } = useAppSelector((state) => state.wallet);
  const getName = (id: number, rqMaterial: RequireMaterial[]) => {
    let name: string = "";
    rqMaterial?.forEach((rq) => {
      if (rq.materialId === id) name = rq.name;
    });
    return name;
  };
  const getTotal = (
    id: number,
    rqMaterial: RequireMaterial[],
    price: number
    ) => {
      let _total = 0;
      rqMaterial?.forEach((rq) => {
        if (rq.materialId === id) _total += rq.quantity * price;
    });
    return _total;
  };
  const { suppliers, manufacturer, requireMaterial, product } = useAppSelector(
    (state) => state.orderData
  );
  const getHolderList = () => {
    let holder: DATA[] = [];
    suppliers.forEach((supplier) => {
      let nameList: string[] = [];
      let total: number = 0;
      supplier.item.forEach((i) => {
        nameList.push(getName(i.id, requireMaterial));
        total += getTotal(i.id, requireMaterial, i.price);
      });
      holder.push({
        addressWallet: supplier.address,
        material: nameList,
        total: total,
      });
    });
    const index = holder.findIndex(
      (h) => h.addressWallet === manufacturer[0].address
      );
      if (index !== -1) {
        holder[index].material.push(product.name);
        holder[index].total += manufacturer[0].item[0].price;
      } else
      holder.push({
        addressWallet: manufacturer[0].address,
        material: [product.name],
        total: manufacturer[0].item[0].price,
      });
      return holder;
    };
    const Data : DATA[] = getHolderList();
    const [total, setTotal] = React.useState(() => {
      let _total = 0;
      Data.forEach((data) => (_total += data.total));
      return _total;
    });
    const deposit = (p: number) => {
    let d = (p / 100) * total;
    return `${p}% (${d} ETH)`;
  };
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
      <Box sx={{ marginTop: 4 }}>
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
