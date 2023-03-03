import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { uuid } from "uuidv4";

import { doLoginUser } from "../../redux/userSlice";
import { useChat } from "../../hooks/useChat";
import { validateUserName } from "../../utils/validateUserName";
import SocketContext from "../../context/context";
import { createMessage } from "../../utils/api/createMessage";


const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const socket  = useContext(SocketContext);
    const {userJoinedMessage} = useChat(socket);

    const [enteredName, setEnteredName] = useState<string>("");

    const handleClickLogin = async () => {
        if (validateUserName(enteredName)) {
            userJoinedMessage(enteredName);
            await createMessage({ author: "Info", message: `${enteredName} подключился к чату` },)
            dispatch(doLoginUser({
                uid: uuid(),
                name: enteredName
            }));
            router.push("/chat")
        } else {
            alert("Имя не может быть пустым!");
        }
    };

    const handeChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => setEnteredName(e.target.value);

    return (
        <div className="login-page">
            <h3 className="name-title">
                Ваше Имя:
            </h3>
            <div id="input-block">
                <input
                    type="text"
                    placeholder="Введите ваше имя..."
                    value={enteredName}
                    onChange={handeChangeUserName}
                />
                <button
                    onClick={handleClickLogin}
                >
                    Войти
                </button>
            </div>
        </div>
    )
}

export default LoginPage;