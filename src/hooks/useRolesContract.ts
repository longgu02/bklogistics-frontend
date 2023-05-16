import { JsonRpcSigner, ethers } from "ethers";
import { getNetworkAddress } from "../constants/address";
import { RolesContractABI } from "../contract/abis/RolesContractABI";

export default function useRolesContract(
	signer: JsonRpcSigner,
	chainId: number
) {
	const contractAddresses = getNetworkAddress(chainId);
	const contract = new ethers.Contract(
		contractAddresses.ROLES_CONTRACT_ADDRESS,
		RolesContractABI,
		signer
	);

	const addMember = async (account: string) => {
		contract
			.addMember(account)
			.then((receipt) => {
				contract.on(
					"MemberAdded",
					(_account: string, _addedDate: any, event) => {
						console.log({
							account: _account,
							addedDate: _addedDate,
						});
						event.removeListener();
					}
				);
				console.log(receipt);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const hasRole = async (role: string, account: string) => {
		const _promise = await contract.hasRole(role, account);
		return _promise;
	};
	const renounceMember = async (account: string) => {
		const _promise = await contract.renounce(account);
		return _promise;
	};
	const addCarrier = async (account: string) => {
		const _promise = await contract.addCarrier(account);
		return _promise;
	};
	const renounceCarrier = async (account: string) => {
		const _promise = await contract.renounceCarrier(account);
		return _promise;
	};
	return {
		contract,
		hasRole,
		addMember,
		renounceMember,
		addCarrier,
		renounceCarrier,
	};
}
