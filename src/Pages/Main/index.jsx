import { useEffect, useState } from "react";
import logo from "../../assets/logo_salt.png";
import linkedin from "../../assets/linkedin.png";
import github from "../../assets/github.png";
import Contacts from "../../components/Contacts";
import Messages from "../../components/Messages";
import api from "../../service/api";
import { getItem } from "../../Utils/storage";
import './styles.css';

export default function Main() {
    const token = getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const [user, setUser] = useState({});

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
        <div className="container-main">
            <header className="container-main-header">
                <div>
                    <img className="logo" src={logo} alt="logo salt" />
                </div>
                <div className="container-user">
                    <span>{user.name}</span>
                </div>
            </header>
            <div className="container-main-components">
                <Contacts />
                <Messages />
            </div>
            <footer className="footer">
                <div className="footer-social">
                    <a href="https://www.linkedin.com/in/sinaratibel/" target="_blank">
                        <img src={linkedin} alt="icon linkedin" />
                    </a>
                    <a href="https://github.com/SinaraMoura" target="_blank">
                        <img src={github} alt="icon github" />
                    </a>
                </div>
                <span>© 2023 - Sinara Tibel - Todos os direitos reservados.</span>
            </footer>
        </div>
    )
}