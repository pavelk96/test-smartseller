import axios  from "axios";
import { MessageType } from "../../types/messageType";

export const getMessages: () => Promise<Array<MessageType>> = async () => {
    const r = await axios.get('/api/message')
        .catch(function (error) {
            console.log(error);
        });
    // @ts-ignore
    return r.data.messages as Array<MessageType>
}