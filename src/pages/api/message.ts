import { uuid } from "uuidv4";
import { NextApiRequest, NextApiResponse } from "next";
const fs = require('fs');

interface ExtendedNextApiRequest extends NextApiRequest {
    body: {
        author: string;
        message: string;
    };
}

export default function MessagesHandler(req: ExtendedNextApiRequest, res: NextApiResponse) {
    const {method, body} = req;

    switch (method) {
        case "POST":
            const db:Array<{author: string; uid: string; message: string}> = JSON.parse(fs.readFileSync('db/messages.json'));
            db.push({
                uid: uuid(),
                author: body.author,
                message: body.message
            })
            fs.writeFileSync('db/messages.json', JSON.stringify(db, null, 4));
            break;

        case "GET":
            const messages = JSON.parse(fs.readFileSync('db/messages.json', {encoding:'utf-8'}));
            res.send({
                messages: messages
            })
            break;
        default:  res.end()
    }

    res.end();
}
