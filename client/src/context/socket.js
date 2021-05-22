import io from "socket.io-client";

const SOCKET_URL = 'http://localhost:5000/'

export const socket = io.connect(SOCKET_URL);
export const SocketContext = React.createContext();

const SocketApp = () => {
	return (
		<SocketContext.Provider value={socket}>
			{children}
		</SocketContext.Provider>
	);
};

export { SocketContext, SocketApp }