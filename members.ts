import { cpuUsage } from "process"

const users: any[] = []

const addMember = (id: string, name: string, room: any) => {

	const existingUser: string = users.find(user => user.name === name)
	const user = { id, name, room }
	users.push(user)
	return { user }
}

const getMember = (id: string) => {
	let user: string = users.find(user => user.id === id)
	return user
}

const deleteMember = (id: string) => {
	const index = users.findIndex((user) => user.id === id);
	if (index !== -1) return users.splice(index, 1)[0];
}

const getMembers = (room: any) => users.filter(user => user.room === room)

module.exports = { addMember, getMember, getMembers, deleteMember }