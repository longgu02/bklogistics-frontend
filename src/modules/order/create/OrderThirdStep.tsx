import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Collapse,
  Typography,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import Autocomplete, {
  AutocompleteChangeReason,
} from "@mui/material/Autocomplete";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import BaseStepper from "../../../components/stepper/BaseStepper";
import FormDialog from "../component/FormDialog";
import { formatAddress, getUnit } from "../../../utils";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useNotify, { errorNotify } from "../../../hooks/useNotify";
import {
  addSupplier,
  addManufacturer,
  addOrderId,
  addTotal,
} from "../../../redux/order/orderSlice";
import { Holder, Item, RequireMaterial, Product } from "../../../types";
import useSupplyChain from "../../../hooks/useSupplyChain";
import usePricingContract from "../../../hooks/usePricingContract";
import { PricingType } from "../../../hooks/usePricingContract";
import {
  getSuppliersByMaterialId,
  getManufacturersByProductId,
} from "../../../services/profile-api";
import CheckRow from "../component/CheckRow";
import { ethers } from "ethers";
interface Address {
  address: string;
  price: number;
}
interface ItemHolder {
  id: number;
  holderAddress: Address[];
}

interface RowProps {
  holder: Holder;
  name?: string;
  role: string;
  validation?: boolean;
  address?: string;
  rqMaterial?: RequireMaterial[];
  product?: Product;
}

export default function OrderThirdStep() {
  const dispatch = useAppDispatch();
  const { successNotify, errorNotify } = useNotify();
  const [open, setOpen] = useState(false);
  const [manufacturersHolderList, setManufacturerHolderList] =
    useState<Address[]>();
  const [suppliersHolderList, setSuppliersHolderList] =
    useState<ItemHolder[]>();
  const { product, requireMaterial, productQty } = useAppSelector(
    (state) => state.orderData
  );
  const { address, signer, chainId } = useAppSelector((state) => state.wallet);
  useEffect(() => {
    let _suppliersHolderList: ItemHolder[] = [];
    let _manufacturersHolderList: Address[] = [];
    if (product.id && signer) {
      const { getPrice } = usePricingContract(signer, chainId);
      getManufacturersByProductId(product.id).then(async (result) => {
        result.manufacturers.map(
          async (r: any) =>
            await getPrice(
              String(r),
              Number(product.id),
              PricingType.PRODUCT
            ).then((res) => {
              _manufacturersHolderList.push({
                address: String(r),
                price: Number(res[1]),
              });
            })
        );
      });
      requireMaterial.forEach((material) => {
        let tmp: Array<{
          address: string;
          price: number;
        }> = [];
        getSuppliersByMaterialId(material.materialId).then((result) => {
          result.suppliers.forEach(async (r: any) => {
            await getPrice(
              String(r),
              material.materialId,
              PricingType.MATERIAL
            ).then((res) => {
              tmp.push({
                address: String(r),
                price: Number(res[1]),
              });
            });
          });
        });
        _suppliersHolderList.push({
          id: material.materialId,
          holderAddress: tmp,
        });
      });
      setManufacturerHolderList(_manufacturersHolderList);
      setSuppliersHolderList(_suppliersHolderList);
    }
  }, []);
  const [sup, setSup] = useState<Holder[]>();
  const [manu, setManu] = useState<Holder[]>();

  function Row(props: RowProps) {
    const { name, address, role, validation, holder, rqMaterial, product } =
      props;
    const [open, setOpen] = useState(false);

    const total = () => {
      let _total = 0;
      if (role === "Supplier") {
        holder.item.forEach((material) =>
          rqMaterial?.forEach((rq) => {
            if (rq.materialId === material.id) {
              _total += material.price * rq.quantity * productQty;
            }
          })
        );
      } else
        holder.item.forEach((material) => {
          _total += material.price * productQty;
        });
      return _total;
    };

    const RenderItem = (item: Item, rq: RequireMaterial[]) => {
      const index = rq.findIndex((rq) => rq.materialId === item.id);
      return (
        <>
          <TableRow key={rq[index].materialId}>
            <TableCell>{rq[index].name}</TableCell>
            <TableCell>
              {ethers.formatUnits(String(item.price), "ether")} ETH
            </TableCell>
            <TableCell>{rq[index].quantity * productQty}</TableCell>
            <TableCell>{getUnit(rq[index].unit)}</TableCell>
            <TableCell>
              {ethers.formatEther(
                String(rq[index].quantity * item.price * productQty)
              )}{" "}
              ETH
            </TableCell>
          </TableRow>
        </>
      );
    };
    return (
      <>
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{formatAddress(holder.address, 5)}</TableCell>
          <TableCell style={{ color: validation ? "green" : "red" }}>
            {validation ? "Verified" : "Not Verified"}
          </TableCell>
          <TableCell>{role}</TableCell>
          <TableCell>{ethers.formatEther(String(total()))} ETH</TableCell>
        </TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Details Information
              </Typography>
              <Typography variant="body1" gutterBottom component="div">
                Name: {name}
              </Typography>
              <Typography variant="body1" gutterBottom component="div">
                Address: {address}
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      {role === "Supplier" ? "Material" : "Product"}
                    </TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Quantity</TableCell>
                    {role === "Supplier" && <TableCell>Unit</TableCell>}
                    <TableCell>Subtotal</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {role === "Supplier" ? (
                    rqMaterial &&
                    holder.item.map((i) => RenderItem(i, rqMaterial))
                  ) : (
                    <TableRow key={holder.item[0].id}>
                      <TableCell>{product?.name}</TableCell>
                      <TableCell>
                        {ethers.formatEther(String(holder.item[0].price))} ETH
                      </TableCell>
                      <TableCell>{productQty}</TableCell>
                      <TableCell>
                        {ethers.formatEther(
                          String(holder.item[0].price * productQty)
                        )}{" "}
                        ETH
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </>
    );
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    let _address: string[] = [];
    let _productIds: number[] = [];
    let _price: number[] = [];
    let _qty: number[] = [];
    if (signer) {
      const { createOrder, contract, addPrice } = useSupplyChain(
        signer,
        chainId
      );
      if (sup && manu && product.id) {
        dispatch(addSupplier(sup));
        dispatch(addManufacturer(manu));
        let _supplier: string[] = [];
        sup.forEach((supplier) => {
          _supplier.push(supplier.address);
          supplier.item.forEach((i) => {
            _address.push(supplier.address);
            _productIds.push(i.id);
            requireMaterial.forEach((r) => {
              if(r.materialId === i.id){
                _qty.push(Number(r.quantity * productQty));
                _price.push(i.price * r.quantity * productQty);
              }
            });
          });
        });
        let _manufacturer: string[] = [];
        manu.forEach((manufacturer) => {
          _manufacturer.push(manufacturer.address);
          manufacturer.item.forEach((i) => {
            _address.push(manufacturer.address);
            _productIds.push(i.id);
            _price.push(i.price * productQty);
            _qty.push(productQty);
          });
        });
        await createOrder(product.id, address, _supplier, _manufacturer).then(
          (response) => {
            contract.on("OrderCreated", async (data) => {
              await addPrice(
                Number(data),
                _address,
                _productIds,
                _price,
                _qty
              ).then(() => dispatch(addOrderId(Number(data))));
            });
          }
        );
      }
      successNotify("Successfully added");
    } else {
      errorNotify("Failed to add");
    }
  };
  const suppliers: Holder[] = [];
  const manufacturer: Holder[] = [];
  const next = () => {
    setSup(suppliers);
    setManu(manufacturer);
    handleClose();
  };

  const RenderItems = (item1: Holder[], item2: Holder[]) => {
    return (
      <>
        {item1.map((item, i) => (
          <Row
            key={i}
            holder={item}
            role="Supplier"
            rqMaterial={requireMaterial}
            validation={true}
          />
        ))}
        {item2.map((item, i) => (
          <Row
            key={i}
            holder={item}
            role="Manufacturer"
            product={product}
            validation={true}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <Button sx={{ marginBottom: 2 }} variant="contained" onClick={handleOpen}>
        Add Stakeholder
      </Button>
      <BaseStepper isDisabled={!manu || !sup} handleConfirm={handleConfirm}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Address</TableCell>
                <TableCell>Validation</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{sup && manu && RenderItems(sup, manu)}</TableBody>
          </Table>
        </TableContainer>
        <FormDialog
          title="Add New Stakeholder"
          isDisabled={false}
          handleClose={handleClose}
          open={open}
          confirm={next}
        >
          <Box sx={{ width: 650 }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              {" "}
              Manufacturer{" "}
            </Typography>
            {manufacturersHolderList && (
              <CheckRow
                id={Number(product.id)}
                title={product.name}
                role={false}
                suppliers={suppliers}
                manufacturers={manufacturer}
                addressWallet={manufacturersHolderList}
              />
            )}
            <Divider sx={{ marginBottom: 2 }} />
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              {" "}
              Supplier
            </Typography>
            {requireMaterial.map((item, index) => (
              <>
                {suppliersHolderList && (
                  <CheckRow
                    id={item.materialId}
                    title={item.name}
                    role={true}
                    suppliers={suppliers}
                    manufacturers={manufacturer}
                    addressWallet={suppliersHolderList[index].holderAddress}
                    key={item.materialId}
                  />
                )}
              </>
            ))}
          </Box>
        </FormDialog>
      </BaseStepper>
    </>
  );
}
