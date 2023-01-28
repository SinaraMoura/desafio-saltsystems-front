import logo from "../../assets/logo_salt.png";
import linkedin from "../../assets/linkedin.png";
import github from "../../assets/github.png";
import robo from "../../assets/robo.png";
import logout from "../../assets/power-off.png"
import Contacts from "../../components/Contacts";
import Messages from "../../components/Messages";
import api from "../../service/api";
import { getItem, removeItem } from "../../Utils/storage";
import './styles.css';
import Bot from "../../components/Bot";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { toast } from "react-toastify";

export default function Main() {
    const navigate = useNavigate();
    const token = getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    }
    const [user, setUser] = useState({});
    const [modalBot, setModalBot] = useState(false);
    const { setContacts } = useContext(UserContext);

    function handleBot() {
        setModalBot(true);
    }

    function handleLogout() {
        removeItem('token', token);
        removeItem('user', user);
        navigate("/");
    }

    useEffect(() => {
        async function handleInitial() {
            try {
                const responseContacts = await api.get('/contacts', { headers });
                setContacts(responseContacts.data);

                const response = await api.get("/users", { headers });
                setUser(response.data);

            } catch (error) {
                toast.error(error?.response?.data?.message);
            }
        };
        handleInitial();
    }, []);

    return (
        <div className="container-main">
            <header className="container-main-header">
                <div>
                    <img className="logo" src={logo} alt="logo salt" />
                </div>
                <div className="container-user">
                    <img className="robo" src={robo} alt="icon robo" onClick={() => handleBot()} />

                    <span className="container-user-span">{user.name}</span>
                    <img className="logout" src={logout} alt="icon logout" onClick={() => handleLogout()} />
                </div>
            </header>
            {modalBot &&
                <div className="div-bot">
                    <Bot setModalBot={setModalBot} />
                </div>
            }
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