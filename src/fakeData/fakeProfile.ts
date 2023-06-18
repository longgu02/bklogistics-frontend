import { Material, Product, Profile, Rq_Material, Unit } from "../types";
import { faker } from "../../node_modules/@faker-js/faker";

const profileList: Profile[] = [];

for (let i = 1; i <= 10; i++) {
  const materialList: Material[] = [];
  const productList: Product[] = [];

  // Generate fake data for materialList
  for (let j = 1; j <= 3; j++) {
    const material: Material = {
      material_id: j,
      name: faker.commerce.productName(),
      unit: [Unit.KILOGRAM, Unit.METER],
      price: faker.number.float({max: 20}),
    };

    materialList.push(material);
  }

  // Generate fake data for productList
  for (let k = 1; k <= 2; k++) {
    const product: Product = {
      id: k,
      name: faker.commerce.productName(),
      price: faker.number.int({ min: 50, max: 200 }),
      rq_material: [],
    };

    for (let l = 0; l < 2; l++) {
      const rqMaterial: Rq_Material = {
        material: materialList[Math.floor(Math.random() * materialList.length)],
        quantity: faker.number.int({ min: 1, max: 10 }),
      };

      product.rq_material.push(rqMaterial);
    }

    productList.push(product);
  }

  const profile: Profile = {
    _id: faker.string.uuid(),
    profile_id: i,
    wallet_address: faker.finance.ethereumAddress(),
    contact_address: faker.location.streetAddress(),
    phone_number: faker.phone.number(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    isMember: faker.datatype.boolean(),
    registeredDate: faker.date.past().toISOString(),
    materialList: materialList,
    productList: productList,
  };

  profileList.push(profile);
}



export default profileList;
