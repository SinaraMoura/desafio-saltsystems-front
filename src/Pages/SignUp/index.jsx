import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../service/api';
import logo from "../../assets/logo_salt.png";
import "./styles.css"
import { toast } from "react-toastify";

export default function SignUp() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (!form.name) {
            toast.error("Campo nome é obrigatório");
            return;
        }
        if (!form.email) {
            toast.error("Campo e-mail é obrigatório");
            return;
        }
        if (!form.password) {
            toast.error("Campo senha é obrigatório");
            return;
        };

        try {
            await api.post('/users', { ...form });
            navigate('/sign-in');
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <main className='container-signup'>
            <header className='container-signup-header'>
                <div>
                    <img className="logo" src={logo} />
                </div>
            </header>

            <section className='container-cadastro'>
                <form className='form-cadastro' onSubmit={handleSubmit}>
                    <h1 className='form-title-signup'><strong>Cadastre-se</strong></h1>

                    <div className='inputs-cadastro'>
                        <label htmlFor="name">Nome</label>
                        <input
                            name='name'
                            value={form.name}
                            onChange={handleForm}
                            id='name'
                            type="text"
                        />
                    </div>

                    <div className='inputs-cadastro'>
                        <label htmlFor="email">E-mail</label>
                        <input
                            name='email'
                            value={form.email}
                            onChange={handleForm}
                            id='email'
                            type="email"
                        />
                    </div>
                    <div className='inputs-cadastro'>
                        <label htmlFor="password">Senha</label>
                        <input
                            name='password'
                            value={form.password}
                            onChange={handleForm}
                            id='password'
                            type="password"
                        />
                    </div>
                    <button className='button-cadastro'>CADASTRAR</button>
                    <span className='sign-up-span'>Já tem cadastro? <Link className='linkSignup' to='/sign-in'>Clique aqui!</Link></span>
                </form>
            </section>
        </main>
    )
}