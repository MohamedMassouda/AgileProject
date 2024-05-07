import { faker } from "@faker-js/faker/locale/af_ZA";
import { $Enums } from "@prisma/client";
import { prisma } from "./src/utils/utils.js";

async function seedEvents() {
  const date = new Date();

  date.setMonth("10");

  for (let i = 0; i < 10; i++) {
    await prisma.event.create({
      data: {
        title: faker.person.fullName(),
        description: faker.lorem.text(),
        date,
        location: faker.location.city(),
        imageUrl: faker.image.url(),
        hostId: "clvm54wne00007angqx3i3p20",
        isApproved: true,
        status: $Enums.EventStatus.APPROVED,
      },
    });
  }
}
