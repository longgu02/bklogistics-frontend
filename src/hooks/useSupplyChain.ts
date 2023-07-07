import { JsonRpcSigner, ethers } from "ethers";
import { getNetworkAddress } from "../constants/address";
import { SupplyChainABI } from "../contract/abis/SupplyChainABI";
import { ErrorProps } from "next/error";

export default function useSupplyChain(signer: JsonRpcSigner, chainId: number) {
  const contractAddress = getNetworkAddress(chainId);
  const contract = new ethers.Contract(
    contractAddress.SUPPLY_CHAIN_CONTRACT_ADDRESS,
    SupplyChainABI,
    signer
  );
  const createOrder = async (
    productId: number,
    customer: string,
    supplier: string[],
    manufacturer: string[]
  ) => {
    const _promise = contract.createOrder(
      productId,
      customer,
      supplier,
      manufacturer
    );
    return _promise;
  };
  const addPrice = async (orderId: number, account: string[], productId: number[] ,price: number[], quantity: number[]) => {
    const _promise = contract.addPrice(orderId, account, productId , price, quantity);
    return _promise;
  };
  const confirmOrder = async (orderId: number) => {
    const _promise = contract.confirmOrder(orderId);
    return _promise;
  };
  const viewOrder = async (orderId: number) => {
    const _promise = contract.viewOrder(orderId);
    return _promise;
  };
  const cancelOrder = async (orderId: number) => {
    const _promise = contract.cancelOrder(orderId);
    return _promise;
  };
  const getTotalPrice = async (orderId: number) => {
    const _promise = contract.getTotalPrice(orderId);
    return _promise;
  };
  const payOrder = async (orderId: number, value: number) => {
    const _promise = contract.payOrder(orderId, {value: value});
    return _promise;
  };
  const deposit = async (orderId: number, value: number) => {
    const _promise = contract.deposit(orderId, {value: value});
    return _promise;
  };
  const hasSigned = async (orderId: number, address: string) => {
    const _promise = contract.hasSigned(orderId, address);
    return _promise;
  }
  return {
    contract,
    createOrder,
    addPrice,
    confirmOrder,
    viewOrder,
    cancelOrder,
    getTotalPrice,
    payOrder,
    deposit,
    hasSigned,
  };
}
