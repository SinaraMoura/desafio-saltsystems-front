import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from '../../service/api';
import logo from "../../assets/logo_salt.png";
import "./styles.css"

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
        try {
            e.preventDefault();

            if (!form.name || !form.email || !form.password) return;

            const response = await api.post('/users', { ...form });
            console.log(response);
            navigate('/sign-in');
        } catch (error) {
            console.log(error);
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
                            required
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
                            required
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
                            required
                        />
                    </div>
                    <button className='button-cadastro'>CADASTRAR</button>
                    <span className='sign-up-span'>Já tem cadastro? <Link className='linkSignup' to='/sign-in'>Clique aqui!</Link></span>
                </form>
            </section>
        </main>
    )
}