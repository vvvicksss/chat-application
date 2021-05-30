"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const users = [];
const addMember = (id, name, room) => {
    const existingUser = users.find(user => user.name === name);
    const user = { id, name, room };
    users.push(user);
    return { user };
};
const getMember = (id) => {
    let user = users.find(user => user.id === id);
    return user;
};
const deleteMember = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1)
        return users.splice(index, 1)[0];
};
const getMembers = (room) => users.filter(user => user.room === room);
module.exports = { addMember, getMember, getMembers, deleteMember };
