import { useEffect, useState } from "react";
import logo from "../../assets/logo_salt.png";
import Contacts from "../../components/Contacts";
import Messages from "../../components/Messages";
import api from "../../service/api";
import { getItem } from "../../Utils/storage";
import './styles.css';

export default function Main() {
    const token = getItem('token');
    const [user, setUser] = useState({});
    const headers = {
        Authorization: `Bearer ${token}`
    }

    async function handleUsuario() {
        try {
            const response = await api.get("/users", { headers });
            setUser(response.data);
        } catch (error) {
            return;
        }
    };
    useEffect(() => {
        handleUsuario();
    }, []);
    return (
        <div>
            <header className="container-main-header">
                <div>
                    <img className="logo" src={logo} alt="logo salt" />
                </div>
                <div className="container-user">
                    <span>nome usuario</span>
                </div>
            </header>
            <Contacts />
            <Messages />
        </div>
    )
}