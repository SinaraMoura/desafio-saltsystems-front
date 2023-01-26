import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Contacts from './components/Contacts';
import UserContext from './context/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Main from './Pages/Main';

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
                <Route path='/sign-in' element={<SignIn />} />
                <Route path='/' element={<SignIn />} />
                {/* <Route exact path="/" element={<Form />} /> */}
                <Route path='/sign-up' element={<SignUp />} />
                <Route path='/main' element={<Main />} />
                <Route exact path='/contacts' element={<Contacts />} />
                {/* <Route exact path='/form' element={<Form />} /> */}
            </Routes>
        </UserContext.Provider>
    )
}