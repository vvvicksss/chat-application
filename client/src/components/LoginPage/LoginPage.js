
import React from 'react'


class LoginPage extends React.Component {
	constructor() {
		super()
	}
	render() {
		console.log(1)
		return (
			<div>
				<input placeholder="Имя Пользовате" />
				<input placeholder="Имя комнаты" />
				<button>Send</button>
			</div>
		)
	}
}


export default LoginPage;
