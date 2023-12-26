import React, { createContext, useMemo } from "react";
import { Socket, io } from "socket.io-client";


export const SocketContext = createContext<{socketio:Socket|null}>({socketio:null});


interface ClientOnlyProps {
    children: React.ReactNode;
}

const SocketProvider: React.FC<ClientOnlyProps> = ({ children }) => {
    const socketio = useMemo(() => io(import.meta.env.VITE_RANDOMHUB_BACKEND, { transports: ["websocket"] }), []);
    return <SocketContext.Provider value={{socketio}} > {children} </SocketContext.Provider>
}

export default SocketProvider;