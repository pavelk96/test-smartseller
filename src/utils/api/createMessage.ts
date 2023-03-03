import { MessageType } from "../../types/messageType";
import axios from "axios";

export const createMessage = async (message: MessageType) => {

    try {
        await axios.post('/api/message', {
            author: message.author,
            message: message.message
        });
    } catch (err) {
        throw new Error('error');
    }
}