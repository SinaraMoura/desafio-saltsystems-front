import api from "../../service/api";
import UserContext from "../../context/UserContext";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

export default function Form() {
    const [form, setForm] = useState({ name: '', phone_number: '' });
    const { componentRender, setComponentRender, setMessages } = useContext(UserContext);

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post("/contacts", { ...form });
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
            toast.error('Contato não adicionado')
        }
    }
    useEffect(() => {
        setMessages([]);
    }, []);
    return (
        <div className="container-form">
            <form className="form" onSubmit={handleSubmit}>
                <h2 className="title-form">Adicionar um novo contato</h2>
                <input
                    type="text"
                    placeholder="Nome"
                    name='name'
                    value={form.name}
                    onChange={handleForm}
                    id='name'
                    required />
                <input
                    type="number"
                    placeholder="Número"
                    name='phone_number'
                    value={form.phone_number}
                    onChange={handleForm}
                    id='phone_number'
                    required />
                <button className="button-form">Adicionar</button>
                <Link className="form-link" to='/contacts' onClick={() => setComponentRender(!componentRender)}>Ir para contatos</Link>
            </form>
        </div>
    )
}