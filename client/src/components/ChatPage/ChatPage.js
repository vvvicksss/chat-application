import { SocketContext } from '../../context/socket';
import { UsersContext } from '../../context/users';
import { MainContext } from '../../context/main';
import { useHistory } from 'react-router-dom';
import { Button, Drawer, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useContext, useEffect, useState } from 'react';
///

import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
///
import './ChatPage.scss'
import React from 'react'
const ChatPage = () => {
	const { name, room, setName, setRoom } = useContext(MainContext)
	const socket = useContext(SocketContext)
	const [message, setMessage] = useState('')
	const [messages, setMessages] = useState([])
	const { users } = useContext(UsersContext)
	const history = useHistory()


	useEffect(() => {
		socket.on("message", msg => {
			setMessages(messages => [...messages, msg]);
		})

		socket.on("notification", notif => {
			alert(notif?.description)
		})
		socket.on("private", elem => {
			alert('Private Message\r\nFrom: ' + elem.user + "\r\n" + "Message: " + elem.text)
		})
	}, [socket])


	const handleSendMessage = () => {
		socket.emit('sendMessage', message, () => setMessage(''))
		setMessage('')
	}

	const privateMess = (e) => {
		console.log(e.target.id);
		let mess = prompt('Write a message');
		socket.emit('privateMessage', mess, e.target.id)
	}
	const logout = () => {
		setName(''); setRoom('');
		history.push('/')
		history.go(0)
	}
	const inputProps = {
		step: 300,
	};

	const useStyles = makeStyles((theme: Theme) =>
		createStyles({
			textField: {
				marginLeft: theme.spacing(1),
				marginRight: theme.spacing(1),
				width: '100%',
				height: '100%',
				marginLeft: "20px",
				marginRight: "20px",
				color: "#fff"
			},
			root: {
				display: 'flex',
			},
			appBar: {
				zIndex: theme.zIndex.drawer + 1,
			},
			drawer: {
				width: "200px",
				flexShrink: 0,
				zIndex: -1,
				color: "#4350AF",
			},
			drawerPaper: {
				width: "200px",
				backgroundColor: "#333333",
				color: "#4350AF",
			},
			drawerContainer: {
				overflow: 'auto',
			},
			content: {
				flexGrow: 1,
				padding: theme.spacing(3),
			},
		})
	)
	const classes = useStyles();
	return (
		<div>      <Drawer
			className={classes.drawer}
			variant="permanent"
			classes={{
				paper: classes.drawerPaper,
			}}
		>
			<Toolbar />
			<div className={classes.drawerContainer}>
				<List>
					{users && users.map(user => {
						return (
							<ListItem onClick={privateMess} button key={user.id} id={user.id} >
								<ListItemText id={user.id} primary={user.name} />
							</ListItem>
						)
					})}
				</List>
			</div>
		</Drawer>
			<div className="header">
				<Button className="logout-btn" variant="contained" color="primary" onClick={logout}>Logout</Button>
			</div>
			<div className='messages'>
				{messages.length > 0 ?
					messages.map((msg, i) =>
						(<div key={i} className={`message ${msg.user === name ? "my-message" : ""}`}>
							<p className='user'>{msg.user}</p>
							<p className='msg'>{msg.text}</p>
						</div>)
					)
					:
					<div className="no-msg">
						<p>No messages</p>
					</div>
				}
			</div>
			<div className='form'>
				<TextField className={classes.textField}
					inputProps={inputProps} value={message} onChange={e => setMessage(e.target.value)}
					id="standard-full-width"
					style={{ margin: 8 }}
					placeholder="Write your message"
					fullWidth
					margin="normal"
					InputLabelProps={{
						shrink: true,
					}} />
				<Button variant="contained" color="primary" onClick={handleSendMessage} disabled={message === '' ? true : false}>Send</Button>
			</div>
		</div>
	)
}


export default ChatPage;
