import React, { useState, useEffect } from "react";
import SocketContext from "./context";
import io from "socket.io-client";

let socket;

const SocketProvider = (props) => {
    const [value, setValue] = useState(null);

    useEffect(() => {
        socketInitializer()
            .catch(e => e)
    }, []);

    const socketInitializer = async () => {
        await fetch("api/socket")
        socket = io();
        setValue(socket)
    };
    return(
        <SocketContext.Provider value={ value }>
            { props.children }
        </SocketContext.Provider>
    )
};
export default SocketProvider;