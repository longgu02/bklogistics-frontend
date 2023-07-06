import { JsonRpcSigner, ethers} from 'ethers';
import { getNetworkAddress } from "../constants/address";
import { ShippingContractABI } from "../contract/abis/ShippingContractABI";

export default function useShippingContract(
    signer: JsonRpcSigner,
    chainId: number
){
    const contractAddress = getNetworkAddress(chainId);
    const contract = new ethers.Contract(
      contractAddress.SHIPMENT_CONTRACT_ADDRESS,
      ShippingContractABI,
      signer
    );
    const createShipment = async (orderId: number, sender: string, carrier: string, receiver: string, pickupDate: number) => {
        const _promise = contract.createShipment(orderId, sender, carrier, receiver, pickupDate);
        return _promise;
    };
    const updateShipment = async (shipmentId: number, deliveryDate: number, status: string) => {
        const _promise = contract.updateShipment(shipmentId,deliveryDate,status);
        return _promise;
    };

    const viewShipment = async (shipmentId: number) =>{
        const _promise = contract.viewShipment(shipmentId);
        return _promise;
    };
    const shipmentOfOrder = async (orderId : number) => {
        const _promise = contract.shipmentOfOrder(orderId);
        return _promise;
    };
    return {
        contract,
        createShipment,
        updateShipment,
        viewShipment,
        shipmentOfOrder,
    };
}