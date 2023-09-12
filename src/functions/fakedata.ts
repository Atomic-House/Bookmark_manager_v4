import { Workspace } from "@/schema/workspace";
import { faker } from "@faker-js/faker";

export function fakerUser() {
	return {
		name: faker.person.fullName(),
		email: faker.internet.email(),
		city: faker.company.name()
	}
}
export function fakerWorkspaces(length: number) {
	let ws: Workspace[] = []
	for (let i = 0; i < length; i++) {
		ws.push({
			name: faker.company.name(),
			id: faker.database.mongodbObjectId(),
			icon:faker.image.avatar()
		})
	}
	return ws
}
