import { faker } from "@faker-js/faker";

interface Member {
  name: string;
  email: string;
  joinedAt: string;
  role: "ADMIN" | "MEMBER";
  userName: string;
  image: string;
}

export function generateUserData(length: number): Member[] {
  let members: Member[] = [];
  for (let i = 0; i < length; i++) {
    members.push({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      joinedAt: faker.date.past().toUTCString(),
      role: faker.helpers.arrayElement(["ADMIN", "MEMBER"]),
      userName: faker.internet.userName(),
      image: faker.image.avatar(),
    });
  }
  return members;
}
