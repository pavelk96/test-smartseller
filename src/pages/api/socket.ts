import { Server } from "socket.io";
import type { Socket as NetSocket } from 'net'
import type { Server as HTTPServer } from 'http'
import { NextApiRequest, NextApiResponse } from "next";

interface SocketServer extends HTTPServer {
  io?: Server | undefined
}

interface SocketWithIO extends NetSocket {
  server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: SocketWithIO
}

export default function SocketHandler(req: NextApiRequest, res: NextApiResponseWithSocket) {
  if (res.socket.server.io) {
    res.end();
    return;
  }

  const io = new Server(res.socket.server);
  res.socket.server.io = io;

  const onConnection = (socket) => {

    socket.on("joinedUser", (msg) => {
      socket.broadcast.emit("newUserConnected", msg);
    });

    socket.on("createdMessage", (msg) => {
      socket.broadcast.emit("newIncomingMessage", msg);
    });

  }
  io.on("connection", onConnection);

  res.end();
}
