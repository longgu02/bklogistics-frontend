import { JsonRpcSigner, ethers } from "ethers";
import { getNetworkAddress } from "../constants/address";
import { SBTContractABI } from "../contract/abis/SBTContractABI";
import { ErrorProps } from "next/error";

export default function useSBTContract(signer: JsonRpcSigner, chainId: number) {
	const contractAddresses = getNetworkAddress(chainId);
	const contract = new ethers.Contract(
		contractAddresses.SBT_CONTRACT_ADDRESS,
		SBTContractABI,
		signer
	);
	const issue = (to: string) => {
		const _promise = contract.issue(to);
		return _promise;
	};
	const claimSBT = (tokenURI: string) => {
		const _promise = contract.claimSBT(tokenURI);
		return _promise;
	};
	return {
		issue,
		claimSBT,
		contract,
	};
}
