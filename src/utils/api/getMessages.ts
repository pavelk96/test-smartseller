import axios  from "axios";
import { MessageType } from "../../types/messageType";

export interface Response {
        messages: Array<MessageType>
}

export const getMessages = async () => {

    try {
        const response = await axios.get<Response>('/api/message');
        return response.data.messages;
    } catch (err) {
        throw new Error('error');
    }
}