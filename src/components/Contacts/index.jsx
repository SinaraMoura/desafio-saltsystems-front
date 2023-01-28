import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import api from "../../service/api";
import { getItem } from "../../Utils/storage";
import ModalNewContact from "../ModalNewContact";
import "./styles.css";

export default function Contacts() {
    const [modalNewContact, setModalNewContact] = useState(false);
    const token = getItem('token');
    const { setIdUser, contacts, setContacts, name, setName, setMessages, setPhone, setComponentRender } = useContext(UserContext);
    const headers = {
        Authorization: `Bearer ${token}`
    }

    useEffect(() => {
        const listContacts = async () => {
            try {
                const response = await api.get('/contacts', { headers });
                setContacts(response.data);
            } catch (error) {
                return;
            }
        }
        listContacts();
    })

    const handleClickContact = async (contact) => {
        try {
            const response = await api.get(`/messages/${contact.id}`, { headers });

            setName(contact.name);
            setPhone(contact.phone_number);
            setMessages(response.data);
            setComponentRender(true);
            setIdUser(contact.id);
        } catch (error) {
            return;
        }
    }

    function handleNewContato() {
        setModalNewContact(true);
    }

    return (
        <div className="container-contacts">
            <div className="container-list-contacts">
                <div className="title">
                    <h1>Contatos</h1>
                    <div className="title-link" onClick={handleNewContato}>Adicionar contato</div>
                    {modalNewContact &&
                        <ModalNewContact setModalNewContact={setModalNewContact} />}
                </div>
                {contacts.map(contact => (
                    <div key={contact.id} className="item-contacts" onClick={() => handleClickContact(contact)}>
                        <span>{contact.name}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}