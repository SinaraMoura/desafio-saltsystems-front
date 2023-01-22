import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../../context/UserContext";
import api from "../../service/api";
import Messages from "../Messages";
import "./styles.css";

export default function Contacts() {
    const { setIdUser, contacts, setContacts, name, setName, messages, setMessages, phone, setPhone, setComponentRender } = useContext(UserContext);

    useEffect(() => {
        const listContacts = async () => {
            try {
                const response = await api.get('/contacts');
                setContacts(response.data);
            } catch (error) {
                return;
            }
        }
        listContacts();
    })

    const handleClickContact = async (contact) => {
        try {
            const response = await api.get(`/messages/${contact.id}`);

            setName(contact.name);
            setPhone(contact.phone_number);
            setMessages(response.data);
            setComponentRender(true);
            setIdUser(contact.id);
        } catch (error) {
            return;
        }
    }

    return (
        <div className="container">
            <div className="container-contatos">
                <div className="title">
                    <h1>Contatos</h1>
                    <NavLink to="/form" className="title-link">Adicionar contato</NavLink>
                </div>
                {contacts.map(contact => (
                    <div key={contact.id} className="item-contacts" onClick={() => handleClickContact(contact)}>
                        <span>{contact.name}</span>
                    </div>
                ))}
            </div>
            <Messages />
        </div>
    )
}