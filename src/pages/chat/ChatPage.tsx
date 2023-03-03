import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

import { selectUserState, userLogout } from "../../redux/userSlice";
import { useChat } from "../../hooks/useChat";
import  Message  from "./message/Message";
import { MessageType } from "../../types/messageType";
import SocketContext from "../../context/context";
import { createMessage } from "../../utils/api/createMessage";
import { getMessages } from "../../utils/api/getMessages";


export const ChatPage: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const socket  = useContext(SocketContext);
    const user = useSelector(selectUserState);
    const messagesEndRef = useRef(null)

    const {newMessageChat, newUserConnected, createdMessage} = useChat(socket);
    const [messages, setMessages] = useState<Array<MessageType>>([]);
    const [message, setMessage] = useState<string>("");

    useEffect(() => {

        newMessageChat((msg) => {
            setMessages((currentMsg) => [
                ...currentMsg,
                { author: msg.author, message: msg.message },
            ]);
        })

        newUserConnected((msg) => {
            setMessages((currentMsg) => [
                ...currentMsg,
                { author: "Info", message: `${msg} подключился к чату` },
            ]);
        })

    }, []);


    const sendMessage = async () => {
        const sentMessage = createdMessage({author: user.userData.name, message });
        setMessages((currentMsg) => [
            ...currentMsg,
            { ...sentMessage },
        ]);
        await createMessage(sentMessage)
        setMessage("");
    };

    const handleKeypress = (e) => {
        if (e.keyCode === 13) {
            if (message) {
                sendMessage()
                    .catch(e => e)
            }
        }
    };

    const handleMessage = (e: React.ChangeEvent<HTMLTextAreaElement>) => setMessage(e.target.value);

    const handleClickLogout = () => {
        dispatch(userLogout());
        router.push("/")
            .catch(e => e)
    };

    const scrollToBottom = () =>
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });


    useEffect(() => {
        getMessages().then(m => setMessages(m))
        if (!user.isAuth) router.push("/")
    }, [])

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    return (
        <div className="chat-page-container">
            <div className="chat-page">
                <div className="chat-header">
                    <p>
                        Your username: {user?.userData?.name}
                    </p>
                    <button onClick={handleClickLogout}>
                        Выйти
                    </button>
                </div>
                <div className="message-block">
                    {messages.map((msg, i) => {
                        return <Message key={i} msg={msg}/>
                    })}
                    <div ref={messagesEndRef}/>
                </div>
            </div>
            <div className="new-message-form">
                    <textarea
                        rows={4}
                        cols={30}
                        value={message}
                        onChange={handleMessage}
                        placeholder="Новое сообщение..."
                        onKeyUp={handleKeypress}/>
                <button
                    onClick={sendMessage}
                >
                    Отправить
                </button>
            </div>
        </div>
    )
}

export default ChatPage;