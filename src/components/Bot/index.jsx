import api from "../../service/api";
import UserContext from "../../context/UserContext";
import { useContext, useState } from "react";
import close from "../../assets/close.png";
import './styles.css';
import { getItem } from "../../Utils/storage";
import { toast } from "react-toastify";

export default function Bot({ setModalBot }) {
    const token = getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const [messagesBot, setMessagesBot,] = useState([]);
    const [input, setInput] = useState("");

    function handleCloseModalBot() {
        setModalBot(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input) return;
        const data = {
            id_origem: 0,
            message: input
        }

        try {
            const response = await api.post("/bot", data, { headers });
            const responseListMessages = await api.get(`/bot/${data.id_origem}`, { headers })
            console.log(response.data);
            setMessagesBot(responseListMessages.data);
            setInput('');
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message);
        }
    }
    return (
        <div className="container-messages-bot">
            <div className="info-contact">
                <h1>SaltBurguer Bot</h1>
                <img className="close-bot" src={close} alt="icon close" onClick={handleCloseModalBot} />
            </div>
            <div className="messages-bot">
                {messagesBot.map(message => {
                    return <div className={message.id % 2 == 0 ? "rigth" : "left"} key={message.id}>{message.message} <span className="data-message-bot">{`${new Date(message.data_message).getHours()}:${new Date(message.data_message).getMinutes()}`}</span></div>;
                })}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    className="input-messages-bot"
                    name="input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Mensagem" />
            </form>
        </div>
    )
}