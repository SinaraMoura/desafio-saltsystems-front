import api from "../../service/api";
import { useState } from "react";
import logo from "../../assets/logo_salt.png";
import iconHidePassword from "../../assets/icon-password-hide.svg";
import iconShowPassword from "../../assets/icon-password-show.svg";
import { setItem } from "../../Utils/storage"
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function SignIn() {
    const [form, setForm] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function handleForm(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.email) {
            toast.error("O e-mail precisa ser informado");
            return;
        }

        if (!form.password) {
            toast.error("A senha precisa ser informada");
            return;
        }

        try {
            const response = await api.post("/login", { ...form });
            const { name, token } = response.data;

            setItem('token', token);
            setItem('user', name);
            setForm({ email: '', password: '' });
            navigate('/main');
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (
        <div className="container-signin">
            <div className="image-sign-in">
                <img src={logo} alt="logo salt" />
            </div>
            <div className="div-form-sign-in">
                <h1 className="sign-in-title">Faça seu login!</h1>
                <form className="form-sign-in" onSubmit={handleSubmit}>
                    <div className="div-email-signin">
                        <label
                            className="label"
                            htmlFor="email">
                            E-mail
                        </label>
                        <input
                            className="inputs"
                            type="email"
                            name='email'
                            value={form.email}
                            id='email'
                            placeholder="Digite seu e-mail"
                            onChange={handleForm}
                        />
                    </div>
                    <div className="div-pass-signin">
                        <label
                            className="label">
                            Senha
                        </label>
                        <input
                            id="password"
                            name="password"
                            className="inputs"
                            placeholder="Digite sua senha"
                            value={form.password}
                            onChange={handleForm}
                            type={showPassword
                                ? "text"
                                : "password"
                            }
                        />
                        <img
                            onClick={() => setShowPassword(!showPassword)}
                            className='icon-password' src={showPassword
                                ? iconShowPassword
                                : iconHidePassword
                            } />
                    </div>
                    <button className='form-sign-in-buttom'>ENTRAR</button>
                    <span className='link-to-sign-up'>
                        Ainda não possui uma conta?{" "}
                        <Link to='/sign-up' className='link'>
                            Cadastre-se
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    )
}