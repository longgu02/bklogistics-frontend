import {
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Collapse,
  MenuItem,
} from "@mui/material";
import Autocomplete, {
  AutocompleteChangeReason,
  createFilterOptions,
} from "@mui/material/Autocomplete";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  nextStep,
  setNextDisabled,
} from "../../../redux/order/orderCreateSlice";
import useNotify from "../../../hooks/useNotify";
import BaseStepper from "../../../components/stepper/BaseStepper";
import { Product, RequireMaterial, Material } from "../../../types";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  _addProduct,
  addRequireMaterial,
} from "../../../redux/order/orderSlice";
import useProductContract from "../../../hooks/useProductContract";
import FormDialog from "../component/FormDialog";
import { getUnit } from "../../../utils";
import { getAllProducts, getOrders, getProductById } from "../../../services/order-api";
type Name = {
  inputValue?: string;
  name: string;
};
type NameProduct = {
  inputValue?: string;
  id?: number;
  name: string;
};
export default function OrderSecondStep() {
  const filter = createFilterOptions<Name>();
  const filterProduct = createFilterOptions<NameProduct>();
  const dispatch = useAppDispatch();
  const finishedStep = useAppSelector(
    (state) => state.orderCreate.finishedStep
  );
  const { signer, chainId } = useAppSelector((state) => state.wallet);
  const { successNotify, errorNotify } = useNotify();
  const [product, setProduct] = React.useState<Product | undefined>();
  const [requiredMaterial, setRequiredMaterial] = React.useState<
    RequireMaterial[] | undefined
  >([]);
  const [option, setOption] = React.useState<string>("");
  const getProductList = (id: number[]) => {
    let result: Product[] = [];
    if (signer) {
      const { getProduct } = useProductContract(signer, chainId);
      try {
        id.forEach(async (i) => {
          const res = await getProduct(i);
          result.push({
            id: Number(res[0]),
            name: String(res[1]),
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
    return result;
  };
  const pId: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // const productList: Product[] = getProductList(pId);
  const res = getAllProducts(5);
  // console.log("🚀 ~ file: OrderSecondStep.tsx:83 ~ OrderSecondStep ~ res:", res)
  const productList: Product[] = [];
  res.then((result) => result.forEach((i : any) => productList.push({
    id: i["productId"],
    name : i["name"],
  })));
  
  // console.log("🚀 ~ file: OrderSecondStep.tsx:84 ~ OrderSecondStep ~ productList:", productList)
  const handleAddProduct = () => {
    console.log(product);
    console.log(requiredMaterial);
    if (product && requiredMaterial) {
      dispatch(_addProduct(product));
      dispatch(addRequireMaterial(requiredMaterial));
    }
  };
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
  const getNumProducts = () => {
    let num: number = 0;
    if (signer) {
      const { productCounter } = useProductContract(signer, chainId);
      productCounter()
        .then((res) => {
          return Number(res);
        })
        .catch((err) => console.log(err));
    }
  };
  const addProduct = async (_name: string) => {
    if (signer) {
      const { addProduct } = useProductContract(signer, chainId);
      try {
        const res = await addProduct(_name);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const mID: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const getMaterialList = (id: number[]) => {
    let result: Material[] = [];
    if (signer) {
      const { getMaterial } = useProductContract(signer, chainId);
      try {
        id.forEach(async (i) => {
          const res = await getMaterial(i);
          result.push({
            materialId: Number(res[0]),
            name: String(res[1]),
          });
        });
      } catch (err) {
        console.log(err);
      }
    }
    return result;
  };
  const materialList: Material[] = [
    {
      materialId: 1,
      name: "Material 1",
    },
    {
      materialId: 2,
      name: "Material 2",
    },
    {
      materialId: 3,
      name: "Material 3",
    },
    {
      materialId: 4,
      name: "Material 4",
    },
    {
      materialId: 5,
      name: "Material 5",
    },
    {
      materialId: 6,
      name: "Material 6",
    },
    {
      materialId: 7,
      name: "Material 7",
    },
    {
      materialId: 8,
      name: "Material 8",
    },
    {
      materialId: 9,
      name: "Material 9",
    },
    {
      materialId: 10,
      name: "Material 10",
    },
  ];

  const Choose = () => {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            marginY: 20,
          }}
        >
          <Button variant="contained" onClick={() => setOption("opt1")}>
            Select Product
          </Button>
          <Typography variant="h6">OR</Typography>
          <Button variant="contained" onClick={() => setOption("opt2")}>
            Create new Product
          </Button>
        </Box>
      </>
    );
  };
  const OPT1 = () => {
    const handleProductChange = (
      event: React.SyntheticEvent,
      value: Product | null
    ) => {
      if (value) {
        handGetRequireMaterial(value.id);
        setProduct({
          id: value.id,
          name: value.name,
        });
        console.log(product);
      }
    };

    return (
      <>
        <IconButton
          onClick={() => {
            setOption("");
            if (product) {
              setProduct(undefined);
            }
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Autocomplete
          options={productList}
          getOptionLabel={(item) => `${item.name}`}
          value={product}
          onChange={handleProductChange}
          renderInput={(params) => (
            <TextField {...params} label="Product" required />
          )}
          sx={{ marginTop: 2 }}
        />
        <Collapse in={!!product} timeout="auto" unmountOnExit>
          <Typography variant="h4">Require Materials:</Typography>
          <TableContainer sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {requiredMaterial?.map((material: RequireMaterial) => (
                  <TableRow key={material.materialId}>
                    <TableCell>{material.materialId}</TableCell>
                    <TableCell>{material.name}</TableCell>
                    <TableCell>{material.quantity}</TableCell>
                    <TableCell>{getUnit(material.unit)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Description: {product?.description}
          </Typography>
        </Collapse>
      </>
    );
  };

  const OPT2 = () => {
    const [productName, setProductName] = React.useState<NameProduct>();
    const [open, setOpen] = React.useState<boolean>(false);
    const [material, setMaterial] = React.useState<Name | null>(null);
    const [toggle, setToggleOpen] = React.useState<boolean>(false);
    const [open1, setOpen1] = React.useState<boolean>(false);
    const [quantity, setQuantity] = React.useState<number>(1);
    const [unit, setUnit] = React.useState<number>(0);
    const unitList: number[] = [0, 1, 2, 3];
    let nameMaterialList: Name[] = [];
    materialList.forEach((m) => nameMaterialList.push({ name: m.name }));
    const handSetRqMaterial = () => {
      {
        if (material) {
          console.log(material);
        }
        if (unit) console.log(unit);
      }
    };
    let rqMaterial: RequireMaterial[] = [];
    const handleCreateNewProduct = () => {
      if(productName) addProduct(productName.name);

    }
    const handleMaterialChange = (
      event: React.SyntheticEvent,
      value: Material | null
    ) => {
      if (value) {
        setMaterial(value);
      }
    };
    return (
      <>
        <IconButton
          onClick={() => {
            setOption("");
            if (product) {
              setProduct(undefined);
            }
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <Box sx={{ display: "flex" }}>
          <Typography variant="h6" sx={{ width: 150 }}>
            Name of Product:
          </Typography>
          <Autocomplete
            value={productName}
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
                if (newValue) setProductName(newValue);
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
                sx={{ width: 250 }}
                label="Product"
                required
              />
            )}
          />
          <Button
            variant="contained"
            sx={{ marginLeft: 2, width: 200 }}
            onClick={() => setOpen(true)}
          >
            Add require material
          </Button>
        </Box>
        <Collapse in={true} timeout="auto" unmountOnExit sx={{ marginTop: 2 }}>
          <Typography variant="h6">Require Materials:</Typography>
          <TableContainer sx={{ marginTop: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rqMaterial?.map((material: RequireMaterial) => (
                  <TableRow key={material.materialId}>
                    <TableCell>{material.materialId}</TableCell>
                    <TableCell>{material.name}</TableCell>
                    <TableCell>{material.quantity}</TableCell>
                    <TableCell>{material.unit}</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography variant="body1" sx={{ marginTop: 2 }}>
            Description: {product?.description}
          </Typography>
        </Collapse>
        <FormDialog
          title="Add Require Material"
          isDisabled={false}
          handleClose={() => setOpen(false)}
          open={open}
          confirm={handSetRqMaterial}
        >
          <Box
            sx={{ width: 650, display: "flex", justifyContent: "space-around" }}
          >
            <Autocomplete
              value={material}
              onChange={(event, newValue) => {
                if (typeof newValue === "string") {
                  setMaterial({
                    name: newValue,
                  });
                } else if (newValue && newValue.inputValue) {
                  setMaterial({
                    name: newValue.inputValue,
                  });
                } else setMaterial(newValue);
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                return filtered;
              }}
              options={nameMaterialList}
              getOptionLabel={(option) => {
                if (typeof option === "string") return option;
                if (option.inputValue) return option.inputValue;
                return String(option.name);
              }}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => (
                <li {...props}>{option.name}</li>
              )}
              freeSolo
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
        <FormDialog
          title="Create a new Product"
          isDisabled={false}
          handleClose={() => setToggleOpen(false)}
          open={toggle}
          confirm={handSetRqMaterial}
        >
          <Typography variant="h6">
            Do you want to create a new Product?
          </Typography>
        </FormDialog>
      </>
    );
  };

  return (
    <BaseStepper isDisabled={!product} handleConfirm={handleAddProduct}>
      {option === "" ? <Choose /> : option === "opt1" ? <OPT1 /> : <OPT2 />}
    </BaseStepper>
  );
}
