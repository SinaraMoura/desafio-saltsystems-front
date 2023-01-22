import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Contacts from './components/Contacts';
import Form from './components/Form';
import UserContext from './context/UserContext';
import 'react-toastify/dist/ReactToastify.css';

export default function MainRouter() {
    const [idUser, setIdUser] = useState(0);
    const [contacts, setContacts] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [messages, setMessages] = useState([]);
    const [componentRender, setComponentRender] = useState(false);

    const valuesProvider = { idUser, setIdUser, contacts, setContacts, name, setName, messages, setMessages, phone, setPhone, componentRender, setComponentRender };
    return (
        <UserContext.Provider value={valuesProvider}>
            <Routes>
                <Route exact path="/" element={<Form />} />
                <Route exact path='/contacts' element={<Contacts />} />
                <Route exact path='/form' element={<Form />} />
            </Routes>
        </UserContext.Provider>
    )
}