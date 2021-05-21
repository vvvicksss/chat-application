const { addMember, getMember, getMembers } = require('./members')

const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const cors = require('cors')
const PORT = process.env.PORT || 5000


app.use(cors())
io.on('connection', (socket: any) => {
	socket.on('login', (name: string, room: string, callback: any) => {
		const { user, error } = addMember(socket.id, name, room)
		if (error) return callback(error)
		socket.join(user.room)
		socket.in(room).emit('notification', { title: 'Кто то вошел', description: `${user.name} присоеденился к нам` })
		io.in(room).emit('users', getMembers(room))
		callback()
	})

	socket.on('sendMessage', (message: string) => {
		const user = getMember(socket.id)
		io.in(user.room).emit('message', { user: user.name, text: message });
	})
})

app.get('/', (req: any, res: any) => {
	res.send("Сервер работает!" + req)
})

http.listen(PORT, () => {
	console.log(`Listening to ${PORT}`);
})
