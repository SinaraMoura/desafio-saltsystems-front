import api from "../../service/api";
import UserContext from "../../context/UserContext";
import { useContext, useState } from "react";
import img from '../../assets/img.jpeg';
import './styles.css';
import { getItem } from "../../Utils/storage";

export default function Messages() {
    const token = getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const { idUser, name, phone, messages, setMessages, componentRender } = useContext(UserContext);
    const [input, setInput] = useState("");

    function maskTelephone(phone) {
        let value = phone;
        value = value.replace(/\D/g, "");
        if (value.length < 7) {
            value = value.replace(/^(\d{2})(\d)/, "($1) $2");
        } else if (value.length < 11) {
            value = value.replace(/^(\d{2})(\d{4})(\d)/, "($1) $2-$3");
        } else if (value.length < 13) {
            value = value.replace(/^(\d{2})(\d{1})(\d{4})(\d)/, "($1) $2 $3-$4");
        } else {
            value = value.replace(
                /^(\d{2})(\d{2})(\d{1})(\d{4})(\d)/,
                "+$1 ($2) $3 $4-$5"
            );
        }
        return value;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input) return;
        const data = {
            user_id: idUser,
            message: input
        }

        try {
            await api.post("/messages", data, { headers });
            const responseListMessages = await api.get(`/messages/${data.user_id}`, { headers })
            setMessages(responseListMessages.data)
            setInput('');
        } catch (error) {
            console.log(error.message);;
        }
    }
    return (
        <div className="container-messages">
            {/* {componentRender ? */}
            <>
                <div className="info-contact">
                    <h1>{name}</h1>
                    <p>{maskTelephone(phone)}</p>
                </div>
                <div className="messages">
                    {messages.map(message => {
                        return <p key={message.id}>{message.message} <span className="data_message">{`${new Date(message.data_message).getHours()}:${new Date(message.data_message).getMinutes()}`}</span></p>;
                    })}
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        className="input-messages"
                        name="input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Mensagem" />
                </form>
            </>
            {/* : <img className="img" src={img} /> */}
            {/* } */}
        </div>
    )
}