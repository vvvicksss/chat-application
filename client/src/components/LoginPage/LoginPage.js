import { SocketContext } from '../../context/socket';
import { UsersContext } from '../../context/users';
import { MainContext } from '../../context/main';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import React from 'react'


const LoginPage = () => {
	const socket = useContext(SocketContext)
	const history = useHistory()
	const { name, setName, room, setRoom } = useContext(MainContext)
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
		console.log(1)
		return (
			<div>
				<input placeholder="Имя Пользователя" />
				<input placeholder="Имя комнаты" />
				<button onClick={handleClick}>Send</button>
			</div>
		)

	}

}
export default LoginPage;
