import 'dotenv/config';

import { faker } from '@faker-js/faker';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

import { PrismaClient } from '../src/generated/prisma';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

type Concert = {
  name: string;
  description: string;
  totalSeats: number;
};

const concertNames = [
  'Bangkok EDM Night',
  'Summer Music Live',
  'Rock Arena Tour',
  'Festival Int 2026',
  'Indie Sound Camp',
  'HipHop City Vibe',
  'Lofi Sunset Stage',
] as const;

async function main() {
  const concerts: Concert[] = Array.from(
    { length: 100 },
    (_, index): Concert => ({
      name: `${faker.helpers.arrayElement(concertNames)} #${index + 1}`,
      description: faker.lorem.sentences({
        min: 1,
        max: 3,
      }),
      totalSeats: faker.number.int({
        min: 20,
        max: 300,
      }),
    }),
  );

  await prisma.reservation.deleteMany();
  await prisma.concert.deleteMany();

  await prisma.concert.createMany({
    data: concerts,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
