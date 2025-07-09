
import "./login.css";
import logo from "../../assets/logo.png"
import iconLogo from "../../assets/iconlogo.png"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./../../constants/api.js"
import { useAuth } from "../../constants/authContext.jsx";

function LoginScreen() {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [visible, setVisible] = useState(false);


    const [showPpass, setShowPass] = useState("password");
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [email, setEmail] = useState("heber@admin.com.br");
    // const [password, setPassword] = useState("12345");

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
                login(dados); 
                navigate("/appointments");
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
    // <Link onClick={()=>setShowPass("text")}>Exibir senha</Link>
    return (
        <div className="bgImage container-fluid min-vh-100 d-flex align-items-center justify-content-center">
            <div className="row w-100">
                <div className="col-12 col-md-6 d-flex justify-content-center align-items-center">
                    <form className="form-signin w-100 px-4 py-5" style={{ maxWidth: '400px' }}>
                        <div className="text-center">
                            <img src={iconLogo} className="logo-signin mb-4" alt="logo" />
                        </div>

                        <input
                            type="email"
                            placeholder="E-mail"
                            className="form-control mb-3"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <div className="position-relative">
                            <input
                                type={visible ? "text" : "password"}
                                className="form-control pe-5 mb-3"
                                placeholder="Digite sua senha"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i
                                className={`bi ${visible ? "bi-eye-slash" : "bi-eye"} position-absolute`}
                                onClick={() => setVisible(!visible)}
                                style={{
                                    fontSize: "1.3rem",
                                    top: "50%",
                                    right: "15px",
                                    transform: "translateY(-50%)",
                                    cursor: "pointer",
                                    color: "#7b7e80"
                                }}
                            ></i>
                        </div>


                        <button
                            onClick={HandleLogin}
                            className="btn btn-primary w-100"
                            type="button"
                        >
                            Login
                        </button>

                        {msg.length > 0 && (
                            <div className="alert alert-danger mt-3" role="alert">
                                {msg}
                            </div>
                        )}

                        <div className="mt-3 text-center">
                            <span className="me-1 text-dark">Clique e faça uma cotação.</span>
                            <Link to="https://www.contate.me/5511915050713">Contato!</Link>
                        </div>
                    </form>
                </div>

                <div className="col-md-6 d-none d-md-block">{/* Imagem ou conteúdo extra */}</div>
            </div>
        </div>



    )
}

export default LoginScreen;