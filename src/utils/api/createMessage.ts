import { MessageType } from "../../types/messageType";
import axios from "axios";

export const createMessage = async (message: MessageType) => {
    await axios.post('/api/message', {
        author: message.author,
        message: message.message
    })
        .catch(function (error) {
            console.log(error);
        });
}