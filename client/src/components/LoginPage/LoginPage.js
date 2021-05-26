import { SocketContext } from '../../context/socket';
import { UsersContext } from '../../context/users';
import { MainContext } from '../../context/main';
import { Button, Drawer, TextField } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import './LoginPage.scss'
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
		<div className="containerLogin">
			<div className="loginForm">
				<h1>Welcome to the ChatApp!</h1>
				<TextField placeholder="Имя Пользователя" value={name} onChange={e => setName(e.target.value)} />
				<TextField placeholder="Имя комнаты" value={room} onChange={e => setRoom(e.target.value)} />
				<Button variant="contained" color="primary" onClick={handleClick}>Send</Button>
			</div>
		</div>
	)

}


export default LoginPage;
