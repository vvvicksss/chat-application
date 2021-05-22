import { SocketContext } from '../../context/socket';
import { UsersContext } from '../../context/users';
import { MainContext } from '../../context/main';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import React from 'react'


const LoginPage = () => {
	const socket = useContext(SocketContext)
	const { name, setName, room, setRoom } = useContext(MainContext)
	const history = useHistory()
	const { setUsers } = useContext(UsersContext)


	useEffect(() => {
		socket.on("users", users => {
			setUsers(users)
		})
	})

	const handleClick = () => {
		socket.emit('login', { name, room }, error => {
			if (error) {
				console.log(error)
			}
			history.push('/chat')
		})
	}
	return (
		<div>
			<input placeholder="Имя Пользователя" value={name} onChange={e => setName(e.target.value)} />
			<input placeholder="Имя комнаты" value={room} onChange={e => setRoom(e.target.value)} />
			<button onClick={handleClick}>Send</button>
		</div>
	)

}


export default LoginPage;
