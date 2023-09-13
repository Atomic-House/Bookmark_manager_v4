import { Board } from "@/schema/board";
import { Bookmark } from "@/schema/bookmarks";
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
			icon: faker.image.avatar()
		})
	}
	return ws
}
export function fakerBoards(length: number) {
	let boards: Board[] = [];

	for (let i = 0; i < length; i++) {
		boards.push({
			name: faker.science.unit().name,
			id: faker.database.mongodbObjectId(),
			icon: faker.image.avatar()
		})
	}
	return boards
}
export function fakeBookmarks(length: number):Bookmark[] {
	let bookmarks:Bookmark[] = []
	for (let i = 0; i < length; i++) {
		bookmarks.push({
			name: faker.science.unit().name,
			id: faker.database.mongodbObjectId(),
			url: faker.internet.url(),
			favicon: faker.image.dataUri(),
			preview: faker.image.avatarGitHub(),
			isDeleted: false,
			title:faker.internet.displayName(),
			description: faker.lorem.paragraph(),

		})
	}

	return bookmarks
}
