import React, { useEffect, useState } from 'react'
import "./style.css"
import { Link, useNavigate } from 'react-router-dom';
import logo from "../../assets/logo.png"
import iconLogo from '../../assets/iconlogo.png'
import api from '../../constants/api';
import { useAuth } from '../../constants/authContext';

export default function LoginScreen() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [showPpass, setShowPass] = useState("password");
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msg, setMsg] = useState("");

    async function HandleLogin(e) {
        e.preventDefault();
        setMsg("");
        try {
            const response = await api.post("/admin/login", {
                email,
                password
            });
             if (response.data) {
                // Armazenar os dados da response em variáveis - "sessionToken, sessionId..."
                const dados = await response.data;
                api.defaults.headers.common['authorization'] = "Bearer " + response.data.token;          
                login(dados); // Armazena no contexto e sessionStorage
                navigate("/home");                
            } else {
                console.log(response);
            }
        } catch (error) {
              if (error.response?.data.error) {
                setMsg(error.response?.data.error);
            } else {
                setMsg("Ocorreu um erro ao efetuar login")
            }
            console.log(error);
        }
    } 
    return (
        <>
            <div className="bgImage">
                <div className='row'>
                    <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
                        <form className="form-signin">
                            <div className="px-4 pb-2 ">
                                <div className="mt-4">
                                    <img src={iconLogo} className="logo w-100 mt-4" />
                                    <input type="email" placeholder="E-mail"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mt-2">
                                    <input type={showPpass} placeholder="Senha"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mt-3 mb-5">
                                    <button onClick={HandleLogin} className="btn btn-primary login-button w-100" type="button">Login</button>
                                </div>

                                {
                                    msg.length > 0 &&
                                    <div className="alert alert-danger" role="alert">
                                        {msg}
                                    </div>
                                }
                                <div>
                                    <span className="me-1">Não tenho uma conta.</span>
                                    <Link to="/register" className="ml-2">Criar agora!</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
