import { SocketActions } from "../enums/socketActions";
import { Socket } from "socket.io";
import { MessageType } from "../types/messageType";

export const useChat = (socket: Socket) => {


    //**********Events**********

    const newMessageChat = (callback: (msg: MessageType) => void) =>
        socket && socket.on(SocketActions.newIncomingMessage, (msg) => callback(msg));

    const newUserConnected = (callback: (msg: MessageType) => void) =>
        socket && socket.on(SocketActions.newUserConnected, (msg) => callback(msg));


    //**********Emits**********

    const createdMessage = (msg: MessageType) => {
        socket && socket.emit(SocketActions.createdMessage, { author: msg.author, message: msg.message });
        return { author: msg.author, message: msg.message }
    };

    const userJoinedMessage = (userName: string) => socket.emit(SocketActions.joinedUser, userName);



    return {
        userJoinedMessage, newMessageChat, newUserConnected, createdMessage
    }

}