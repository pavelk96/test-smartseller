import { createContext } from "react";
import { Socket } from "socket.io";
const SocketContext = createContext<Socket>(null);
export default SocketContext;