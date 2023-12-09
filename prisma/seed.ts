// import the Prisma client
import { PrismaClient, Gender } from "@prisma/client";
import { Faker, faker } from "@faker-js/faker";

// instantiate the Prisma client
const prisma = new PrismaClient();

function generateRandomImageUrl() {
  return faker.image.avatar();
}

// define the seed function
async function seed() {
  const usersData = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      emailVerified: new Date(),
      image: generateRandomImageUrl(),
      address: "123 Main St, City",
      dob: new Date("1990-01-15"),
      gender: Gender.male,
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      emailVerified: new Date(),
      image: generateRandomImageUrl(),
      address: "456 Oak St, Town",
      dob: new Date("1985-05-20"),
      gender: Gender.female,
    },
    {
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      emailVerified: new Date(),
      image: generateRandomImageUrl(),
      address: "789 Pine St, Village",
      dob: new Date("1982-08-10"),
      gender: Gender.male,
    },
    {
      name: "Alice Williams",
      email: "alice.williams@example.com",
      emailVerified: new Date(),
      image: generateRandomImageUrl(),
      address: "101 Cedar St, Hamlet",
      dob: new Date("1993-03-25"),
      gender: Gender.female,
    },
    {
      name: "Charlie Brown",
      email: "charlie.brown@example.com",
      emailVerified: new Date(),
      image: generateRandomImageUrl(),
      address: "234 Birch St, County",
      dob: new Date("1988-11-12"),
      gender: Gender.male,
    },
    {
      name: "Eva Davis",
      email: "eva.davis@example.com",
      emailVerified: new Date(),
      image: generateRandomImageUrl(),
      address: "567 Pine St, Village",
      dob: new Date("1995-09-18"),
      gender: Gender.female,
    },
    {
      name: "Frank Miller",
      email: "frank.miller@example.com",
      emailVerified: new Date(),
      image: generateRandomImageUrl(),
      address: "876 Oak St, Town",
      dob: new Date("1980-07-02"),
      gender: Gender.male,
    },
    {
      name: "Grace Taylor",
      email: "grace.taylor@example.com",
      emailVerified: new Date(),
      image: generateRandomImageUrl(),
      address: "345 Main St, City",
      dob: new Date("1998-04-30"),
      gender: Gender.female,
    },
    {
      name: "Harry Wilson",
      email: "harry.wilson@example.com",
      emailVerified: new Date(),
      image: generateRandomImageUrl(),
      address: "654 Elm St, Town",
      dob: new Date("1983-12-08"),
      gender: Gender.male,
    },
    {
      name: "Ivy Robinson",
      email: "ivy.robinson@example.com",
      emailVerified: new Date(),
      image: generateRandomImageUrl(),
      address: "987 Cedar St, Hamlet",
      dob: new Date("1991-06-14"),
      gender: Gender.female,
    },
  ];

  // Use Prisma to create users
  await prisma.user.createMany({
    data: usersData,
  });

  // Close the Prisma client connection
  await prisma.$disconnect();
}

// run the seed function
seed().catch((e) => {
  throw e;
});
