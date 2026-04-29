import { faker } from "@faker-js/faker";

faker.seed(100);

type Concert = {
  id: number;
  name: string;
  description: string;
  seats: number;
  reserved?: boolean;
};

export const concerts: Concert[] = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  name: faker.helpers.arrayElement([
    "The Festival Int 2024",
    "Summer Music Live",
    "Rock Arena Tour",
    "Bangkok EDM Night",
  ]),
  description: faker.lorem.paragraph(),
  seats: faker.number.int({ min: 100, max: 5000 }),
  reserved: faker.datatype.boolean(),
}));
