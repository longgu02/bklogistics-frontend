import {
  Box,
  TextField,
  Button,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Collapse,
  MenuItem,
} from "@mui/material";
import Autocomplete, {
  AutocompleteChangeReason,
  createFilterOptions,
} from "@mui/material/Autocomplete";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import useNotify from "../../../hooks/useNotify";
import BaseStepper from "../../../components/stepper/BaseStepper";
import { Product, RequireMaterial } from "../../../types";
import {
  _addProduct,
  addRequireMaterial,
  updateProductQty,
} from "../../../redux/order/orderSlice";
import useProductContract from "../../../hooks/useProductContract";
import FormDialog from "../component/FormDialog";
import { getUnit } from "../../../utils";
import { getAllProductOnChain } from "../../../services/product-api";
import { getAllMaterialOnChain } from "../../../services/material-api";
type Name = {
  inputValue?: string;
  materialId?: number;
  name: string;
};
type NameProduct = {
  inputValue?: string;
  id?: number;
  name: string;
};
export default function OrderSecondStep() {
  const filterProduct = createFilterOptions<NameProduct>();
  const dispatch = useAppDispatch();
  const { signer, chainId } = useAppSelector((state) => state.wallet);
  const { successNotify, errorNotify } = useNotify();
  const [product, setProduct] = React.useState<Product | undefined>();
  const [productName, setProductName] = React.useState<Product>();
  const [toggle, setToggleOpen] = React.useState<boolean>(false);
  const [requiredMaterial, setRequiredMaterial] = React.useState<
    RequireMaterial[] | undefined
  >([]);
  const [newRequireMaterial, setNewRequireMaterial] = React.useState<
    RequireMaterial[] | undefined
  >([]);
  const [isNewProduct, setIsNew] = React.useState<boolean>(false);
  const unitList: number[] = [0, 1, 2, 3];
  const MaterialList: Name[] = [];
  getAllMaterialOnChain(5).then((result) => {
    result.materials.forEach((r: any) => {
      MaterialList.push({
        materialId: Number(r["materialId"]),
        name: r["name"],
      });
    });
  });
  const productList: Product[] = [];
  getAllProductOnChain(5).then((result: any) => {
    result.forEach((r: any) => {
      productList.push({
        id: Number(r["productId"]),
        name: String(r["name"]),
      });
    });
  });
  const handGetRequireMaterial = async (id: number) => {
    let result: RequireMaterial[] = [];
    if (signer) {
      const { getRequiredMaterial, getMaterial } = useProductContract(
        signer,
        chainId
      );
      try {
        const res = await getRequiredMaterial(id);
        for (const item of res) {
          const response = await getMaterial(Number(item[0]));
          result.push({
            materialId: Number(item[0]),
            name: String(response[1]),
            quantity: Number(item[1]),
            unit: Number(item[2]),
          });
        }
        setRequiredMaterial(result);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const addProduct = async (_name: string) => {
    if (signer) {
      const { addProduct, contract } = useProductContract(signer, chainId);
      try {
        await addProduct(_name).then((response) => {
          contract.on("ProductAdded", (data) => {
            setProduct({
              id: Number(data),
              name: _name,
            });
            setIsNew(true);
            setToggleOpen(false);
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
  };
  const [productQty, setProductQty] = React.useState<number>(1);
  const handleAddProduct = () => {
    if (product && requiredMaterial) {
      dispatch(_addProduct(product));
      dispatch(addRequireMaterial(requiredMaterial));
      dispatch(updateProductQty(productQty));
    }
  };
  const handleAddNewRqMaterial = () => {
    if (signer && newRequireMaterial && product) {
      const { addRequiredMaterial, contract } = useProductContract(
        signer,
        chainId
      );
      newRequireMaterial.forEach(async (material) => {
        const res = await addRequiredMaterial(
          Number(product.id),
          material.materialId,
          material.quantity,
          material.unit
        );
        await res.wait();
      });
      dispatch(_addProduct(product));
      dispatch(addRequireMaterial(newRequireMaterial));
      dispatch(updateProductQty(productQty));
    }
  };
  const [material, setMaterial] = React.useState<Name | undefined>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [quantity, setQuantity] = React.useState<number>(1);
  const [unit, setUnit] = React.useState<number>(0);
  const handleProductChange = (
    event: React.SyntheticEvent,
    value: Product | null
  ) => {
    if (value && value.id) {
      handGetRequireMaterial(value.id);
      setProduct(value);
      setIsNew(false);
    }
  };
  const handleMaterialChange = (
    event: React.SyntheticEvent,
    value: Name | null
  ) => {
    if (value && value.materialId) {
      setMaterial(value);
    }
  };
  const handleCreateRqMaterial = () => {
    if (newRequireMaterial) {
      let newRqMaterial = [...newRequireMaterial];
      if (material && material.materialId) {
        newRqMaterial.push({
          materialId: material.materialId,
          name: material.name,
          quantity: quantity,
          unit: unit,
        });
        setNewRequireMaterial(newRqMaterial);
        setMaterial(undefined);
        setQuantity(1);
        setUnit(1);
        setOpen(false);
      }
    }
  };
  const handleDeleteMaterial = (materialId: number) => {
    if (newRequireMaterial) {
      let newRqMaterial = [...newRequireMaterial];
      const index = newRqMaterial.findIndex((m) => m.materialId === materialId);
      console.log(
        "🚀 ~ file: OrderSecondStep.tsx:193 ~ handleDeleteMaterial ~ index:",
        index
      );
      newRqMaterial.splice(index, 1);
      setNewRequireMaterial(newRqMaterial);
    }
  };

  return (
    <BaseStepper
      isDisabled={!product}
      handleConfirm={isNewProduct ? handleAddNewRqMaterial : handleAddProduct}
    >
      <Box sx={{ display: "flex" }}>
        <Autocomplete
          value={product}
          onChange={(event, newValue) => {
            if (typeof newValue === "string") {
              setProductName({
                name: newValue,
              });
              setToggleOpen(true);
            } else if (newValue && newValue.inputValue) {
              setProductName({
                name: newValue.inputValue,
              });
              setToggleOpen(true);
            } else {
              if (newValue) {
                handleProductChange(event, newValue);
              }
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filterProduct(options, params);
            if (params.inputValue !== "") {
              filtered.push({
                inputValue: params.inputValue,
                name: `Add "${params.inputValue}"`,
              });
            }
            return filtered;
          }}
          options={productList}
          getOptionLabel={(option) => {
            if (typeof option === "string") return option;
            if (option.inputValue) return option.inputValue;
            return String(option.name);
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          renderOption={(props, option) => <li {...props}>{option.name}</li>}
          freeSolo
          renderInput={(params) => (
            <TextField
              {...params}
              label="Product"
              sx={{ width: 300 }}
              required
            />
          )}
        />
        <TextField
          value={productQty}
          sx={{ maxWidth: 100, minWidth: 50, ml: 2 }}
          type="number"
          label="Quantity"
          required
          onChange={(event) => {
            if (Number(event.target.value) > 0)
              setProductQty(Number(event.target.value));
          }}
        />
        {isNewProduct && (
          <Button
            variant="contained"
            sx={{ marginLeft: 2, width: 200 }}
            onClick={() => setOpen(true)}
          >
            Add require material
          </Button>
        )}
      </Box>
      <Collapse
        in={!!product}
        timeout="auto"
        unmountOnExit
        sx={{ mt: 2, ml: 4 }}
      >
        <Typography variant="h5">Require Materials:</Typography>
        <TableContainer sx={{ marginTop: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit</TableCell>
                {isNewProduct && <TableCell></TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {isNewProduct
                ? newRequireMaterial?.map((material: RequireMaterial) => (
                    <TableRow key={material.materialId}>
                      <TableCell>{material.materialId}</TableCell>
                      <TableCell>{material.name}</TableCell>
                      <TableCell>{material.quantity * productQty}</TableCell>
                      <TableCell>{getUnit(material.unit)}</TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() =>
                            handleDeleteMaterial(material.materialId)
                          }
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                : requiredMaterial?.map((material: RequireMaterial) => (
                    <TableRow key={material.materialId}>
                      <TableCell>{material.materialId}</TableCell>
                      <TableCell>{material.name}</TableCell>
                      <TableCell>{material.quantity * productQty}</TableCell>
                      <TableCell>{getUnit(material.unit)}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Collapse>
      <FormDialog
        title="Create a new Product"
        isDisabled={false}
        handleClose={() => setToggleOpen(false)}
        open={toggle}
        confirm={() => {
          if (productName) {
            addProduct(productName.name);
          }
        }}
      >
        <Typography variant="h6">
          Do you want to create a new Product?
        </Typography>
      </FormDialog>
      <FormDialog
        title="Add Require Material"
        isDisabled={false}
        handleClose={() => setOpen(false)}
        open={open}
        confirm={handleCreateRqMaterial}
      >
        <Box
          sx={{
            width: 650,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <Autocomplete
            value={material}
            onChange={(event, value) => {
              if (value) handleMaterialChange(event, value);
            }}
            options={MaterialList}
            getOptionLabel={(option) => {
              return `${option.name}`;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={{ width: 250 }}
                label="Material"
                required
              />
            )}
          />
          <TextField
            value={quantity}
            sx={{ width: 100 }}
            type="number"
            label="Quantity"
            required
            onChange={(event) => {
              if (Number(event.target.value) > 0)
                setQuantity(Number(event.target.value));
            }}
          />
          <TextField
            select
            value={unit}
            sx={{ width: 100 }}
            label="Unit"
            required
          >
            {unitList.map((i) => (
              <MenuItem key={i} value={i} onClick={() => setUnit(i)}>
                {getUnit(i)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </FormDialog>
    </BaseStepper>
  );
}
