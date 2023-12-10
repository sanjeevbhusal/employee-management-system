// import the Prisma client
import { PrismaClient, Gender } from "@prisma/client";
import { Faker, faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

// instantiate the Prisma client
const prisma = new PrismaClient();

async function seed() {
  const organization = await prisma.organization.create({
    data: {
      name: "Google",
      address: "1600 Amphitheatre Parkway, Mountain View, CA 94043",
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Sanjeev Bhusal",
      about: "I am a software engineer",
      email: "bhusalsanjeev23@gmail.com",
      city: "Kathmandu",
      country: "Nepal",
      dob: new Date("2002-08-24"),
      gender: "male",
      image: faker.image.avatar(),
      organizationId: organization.id,
      password: await bcrypt.hash("helloworld", 10),
      state: "Bagmati",
      streetAddress: "Bagbazzar",
    },
  });
}

// function generateRandomImageUrl() {
//   return faker.image.avatar();
// }

// // define the seed function
// async function seed() {
//   const departmentsData = [
//     { name: "Human Resources" },
//     { name: "Finance" },
//     { name: "Marketing" },
//     { name: "IT" },
//     { name: "Customer Support" },
//   ];

//   await prisma.department.createMany({
//     data: departmentsData,
//   });

//   const departments = await prisma.department.findMany();

//   const rolesData = [
//     { name: "Manager" },
//     { name: "Software Enginner" },
//     { name: "Customer Service Representative" },
//     { name: "Marketing Intern" },
//     { name: "Marketing Manager" },
//     { name: "Accountant" },
//     { name: "Finance Officer" },
//     { name: "HR Officer" },
//     { name: "IT Operations Manager" },
//     // Add more roles as needed
//   ];

//   await prisma.role.createMany({
//     data: rolesData,
//   });

//   const roles = await prisma.role.findMany();

//   function getDepartment() {
//     return faker.helpers.arrayElement(departments);
//   }

//   function getRoles() {
//     return faker.helpers.arrayElement(roles);
//   }

//   const usersData = [
//     {
//       name: "John Doe",
//       email: "john.doe@example.com",
//       emailVerified: new Date(),
//       image: generateRandomImageUrl(),
//       address: "123 Main St, City",
//       dob: new Date("1990-01-15"),
//       gender: Gender.male,
//       departmentId: getDepartment().id,
//       roleId: getRoles().id,
//     },
//     {
//       name: "Jane Smith",
//       email: "jane.smith@example.com",
//       emailVerified: new Date(),
//       image: generateRandomImageUrl(),
//       address: "456 Oak St, Town",
//       dob: new Date("1985-05-20"),
//       gender: Gender.female,
//       departmentId: getDepartment().id,
//       roleId: getRoles().id,
//     },
//     {
//       name: "Bob Johnson",
//       email: "bob.johnson@example.com",
//       emailVerified: new Date(),
//       image: generateRandomImageUrl(),
//       address: "789 Pine St, Village",
//       dob: new Date("1982-08-10"),
//       gender: Gender.male,
//       departmentId: getDepartment().id,
//       roleId: getRoles().id,
//     },
//     {
//       name: "Alice Williams",
//       email: "alice.williams@example.com",
//       emailVerified: new Date(),
//       image: generateRandomImageUrl(),
//       address: "101 Cedar St, Hamlet",
//       dob: new Date("1993-03-25"),
//       gender: Gender.female,
//       departmentId: getDepartment().id,
//       roleId: getRoles().id,
//     },
//     {
//       name: "Charlie Brown",
//       email: "charlie.brown@example.com",
//       emailVerified: new Date(),
//       image: generateRandomImageUrl(),
//       address: "234 Birch St, County",
//       dob: new Date("1988-11-12"),
//       gender: Gender.male,
//       departmentId: getDepartment().id,
//       roleId: getRoles().id,
//     },
//     {
//       name: "Eva Davis",
//       email: "eva.davis@example.com",
//       emailVerified: new Date(),
//       image: generateRandomImageUrl(),
//       address: "567 Pine St, Village",
//       dob: new Date("1995-09-18"),
//       gender: Gender.female,
//       departmentId: getDepartment().id,
//       roleId: getRoles().id,
//     },
//     {
//       name: "Frank Miller",
//       email: "frank.miller@example.com",
//       emailVerified: new Date(),
//       image: generateRandomImageUrl(),
//       address: "876 Oak St, Town",
//       dob: new Date("1980-07-02"),
//       gender: Gender.male,
//       departmentId: getDepartment().id,
//       roleId: getRoles().id,
//     },
//     {
//       name: "Grace Taylor",
//       email: "grace.taylor@example.com",
//       emailVerified: new Date(),
//       image: generateRandomImageUrl(),
//       address: "345 Main St, City",
//       dob: new Date("1998-04-30"),
//       gender: Gender.female,
//       departmentId: getDepartment().id,
//       roleId: getRoles().id,
//     },
//     {
//       name: "Harry Wilson",
//       email: "harry.wilson@example.com",
//       emailVerified: new Date(),
//       image: generateRandomImageUrl(),
//       address: "654 Elm St, Town",
//       dob: new Date("1983-12-08"),
//       gender: Gender.male,
//       departmentId: getDepartment().id,
//       roleId: getRoles().id,
//     },
//     {
//       name: "Ivy Robinson",
//       email: "ivy.robinson@example.com",
//       emailVerified: new Date(),
//       image: generateRandomImageUrl(),
//       address: "987 Cedar St, Hamlet",
//       dob: new Date("1991-06-14"),
//       gender: Gender.female,
//       departmentId: getDepartment().id,
//       roleId: getRoles().id,
//     },
//   ];

//   // Use Prisma to create users
//   await prisma.user.createMany({
//     data: usersData,
//   });

//   // Close the Prisma client connection
//   await prisma.$disconnect();
// }

// // run the seed function
seed().catch((e) => {
  throw e;
});
