import api from "../../service/api";
import UserContext from "../../context/UserContext";
import { useContext, useState } from "react";
import img from '../../assets/img.jpeg';
import './styles.css';

export default function Messages() {
    const { idUser, name, phone, messages, setMessages, componentRender } = useContext(UserContext);
    const [input, setInput] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!input) return;
        const data = {
            user_id: idUser,
            message: input
        }

        try {
            await api.post("/messages", data);
            const responseListMessages = await api.get(`/messages/${data.user_id}`)
            setMessages(responseListMessages.data)
            setInput('');
        } catch (error) {
            console.log(error);;
        }
    }
    return (
        <div className="container-messages">
            {componentRender ?
                <>
                    <div className="info-contact">
                        <h1>{name}</h1>
                        <p>{phone}</p>
                    </div><div className="messages">
                        {messages.map(message => {
                            return <p key={message.id}>{message.message} <span className="data_message">{`${new Date(message.data_message).getHours()}:${new Date(message.data_message).getMinutes()}`}</span></p>;
                        })}
                    </div><form onSubmit={handleSubmit}>
                        <input
                            className="input-messages"
                            name="input"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Mensagem" />
                    </form>
                </>
                : <img className="img" src={img} />
            }
        </div>
    )
}