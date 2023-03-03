import React from "react";

import { MessageType } from "../../../types/messageType";

interface IMessage {
    msg: MessageType
}

const Message: React.FC<IMessage> = ({msg}) =>
    <div className={msg?.author === "Info" && "info-message"}>
            <p id="author">
                {msg?.author}
            </p>
            <p id="message">
                {msg?.message}
            </p>
        </div>

export default Message;