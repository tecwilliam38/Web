
import "./login.css";
import logo from "../../assets/logo.png"
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "./../../constants/api.js"



function Login() {

    const navigate = useNavigate();

    const [showPpass, setShowPass] = useState("password");
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [email, setEmail] = useState("heber@admin.com.br");
    // const [password, setPassword] = useState("12345");

    const [msg, setMsg] = useState("");

    async function HandleLogin() {
        setMsg("");
        try {
            const response = await api.post("/admin/login", {
                email,
                password
            });
            if (response.data) {
                // Armazenar os dados da response em variáveis - "sessionToken, sessionId..."
                localStorage.setItem("sessionToken", response.data.token);
                localStorage.setItem("sessionId", response.data.id_admin);
                localStorage.setItem("sessionEmail", response.data.email);
                localStorage.setItem("sessionName", response.data.name);
                api.defaults.headers.common['authorization'] = "Bearer " + response.data.token;
                navigate("/appointments")
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
        <div className="bgImage">
            <div className="row">
                <div className="col-sm-5 d-flex justify-content-center align-items-center text-center">
                    <form className="form-signin">
                        <img src={logo} className="logo w-100 mb-4 mt-4" />
                        <div className="px-4 pt-3 pb-2 ">
                            <h5 className="mb-4">Gerencie seus agendamentos de forma descomplicada.</h5>
                            <h5 className="mb-4 text-secondary">Acesse sua conta</h5>
                            <div className="mt-4">
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
                                    {/* <Link onClick={()=>setShowPass("text")}>Exibir senha</Link> */}
                            </div>
                            <div className="mt-3 mb-5">
                                <button onClick={HandleLogin} className="btn btn-primary w-100" type="button">Login</button>
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
                <div className="col-sm-7"></div>


            </div>
        </div>
    )
}

export default Login;