import api from "../../service/api";
import UserContext from "../../context/UserContext";
import close from "../../assets/close.png";
import { useState, useContext, useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import { getItem } from "../../Utils/storage";

export default function ModalNewContact({ setModalNewContact }) {
    const [form, setForm] = useState({ name: '', phone_number: '' });
    const { setMessages } = useContext(UserContext);
    const token = getItem('token');
    const headers = {
        Authorization: `Bearer ${token}`
    }

    function handleCloseModal() {
        setModalNewContact(false);
    }

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.name) {
            toast.error('Nome de contato obrigatório');
            return;
        }
        if (!form.phone_number) {
            toast.error('Número de contato obrigatório');
            return;
        }

        try {
            await api.post("/contacts", { ...form }, { headers });
            setForm({ name: '', phone_number: '' });

            toast.success('Contato adicionado!',
                {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light"
                });
        } catch (error) {
            toast.error(error.message);
        }
    }
    useEffect(() => {
        setMessages([]);
    }, []);
    return (
        <div className="container-form">
            <img className="close" src={close} alt="icon close" onClick={handleCloseModal} />
            <form className="form" onSubmit={handleSubmit}>
                <h3 className="title-form">Adicionar um novo contato</h3>
                <input
                    type="text"
                    placeholder="Nome"
                    name='name'
                    value={form.name}
                    onChange={handleForm}
                    id='name'
                />
                <input
                    type="number"
                    placeholder="Número"
                    name='phone_number'
                    value={form.phone_number}
                    onChange={handleForm}
                    id='phone_number'
                />
                <button className="button-form">Adicionar</button>
            </form>
        </div>
    )
}