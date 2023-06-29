import { client } from "../client";

export const getAllMaterialOnChain = async (_chainId: number) => {
  const res = await client
    .get(`/materials/${_chainId}`)
    .then((results) => {
      return results;
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
};