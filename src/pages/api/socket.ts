import { Server } from "socket.io";
import type { Socket as NetSocket } from 'net'
import type { Server as HTTPServer } from 'http'
import { NextApiRequest, NextApiResponse } from "next";
import { SocketActions } from "../../enums/socketActions";

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

    socket.on(SocketActions.joinedUser, (msg) => {
      socket.broadcast.emit(SocketActions.newUserConnected, msg);
    });

    socket.on(SocketActions.createdMessage, (msg) => {
      socket.broadcast.emit(SocketActions.newIncomingMessage, msg);
    });

  }
  io.on("connection", onConnection);

  res.end();
}
