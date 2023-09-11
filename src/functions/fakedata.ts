import { faker } from "@faker-js/faker";

export function fakerUser() {
	return {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		city: faker.company.name()
	}
}
