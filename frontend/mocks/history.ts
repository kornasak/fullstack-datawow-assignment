import { faker } from "@faker-js/faker";

faker.seed(99);

export const histories = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  datetime: faker.date.recent({ days: 30 }).toLocaleString("th-TH"),
  username: faker.person.fullName(),
  concertName: faker.helpers.arrayElement([
    "The Festival Int 2024",
    "Summer Music Live",
    "Rock Arena Tour",
    "Bangkok EDM Night",
  ]),
  action: faker.helpers.arrayElement(["Reserve", "Cancel"]),
}));
