import { JsonRpcSigner, ethers } from "ethers";
import { ROLES_CONTRACT } from "../constants/address";
import { RolesContractABI } from "../contract/abis/RolesContractABI";

export default function useRolesContract(signer: JsonRpcSigner) {
	const contract = new ethers.Contract(
		ROLES_CONTRACT,
		RolesContractABI,
		signer
	);

	const hasRole = async (role: string, account: string) => {
		const isMember = await contract.hasRole(role, account);
		return isMember;
	};

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
		// console.log(receipt);
		return;
	};

	return { contract, hasRole, addMember };
}
