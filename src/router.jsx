import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import UserContext from './context/UserContext';
import 'react-toastify/dist/ReactToastify.css';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import Main from './Pages/Main';
import { getItem } from './Utils/storage';

function ProtectedRoutes({ redirectTo }) {
    const isAuthenticated = getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />
}

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
                <Route exact path='/sign-in' element={<SignIn />} />
                <Route exact path='/' element={<SignIn />} />
                <Route exact path='/sign-up' element={<SignUp />} />


                <Route element={<ProtectedRoutes redirectTo="/" />}>
                    <Route path='/main' element={<Main />} />
                </Route>
            </Routes>
        </UserContext.Provider>
    )
}