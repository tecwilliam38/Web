import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import logo from "../../assets/logo.png";
import { useState } from "react";
import api from "../../constants/api.js";
import { useAuth } from "../../constants/authContext.jsx";
import Navbar from "../../components/navbar/navbar.jsx";

function RegisterTecnicoComponent() {

    const navigate = useNavigate()
    const [name, setName] = useState()
    const [cel_phone, setCel_phone] = useState();
    const [endereco, setEndereco] = useState();
    const [email, setEmail] = useState("")
    const [specialty, setSpecialty] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [msg, setMsg] = useState("");
    const { user } = useAuth();
    const [visible, setVisible] = useState(false);

    async function ExecuteAccount() {
        // navigate("/appointments");
        setMsg("");

        if (password != password2)
            return setMsg("As senhas não conferem. Digite novamente.");

        try {
            const response = await api.post("/tecnicos/register", {
                name,
                cel_phone,
                endereco,
                email,
                specialty,
                password
            }, {
                headers: { Authorization: `Bearer ${user.token}` }
            });

            if (response.data) {
                // alert("cadastrou")
                navigate("/appointments");

            } else
                setMsg("Erro ao criar conta. Tente novamente mais tarde.");

        } catch (error) {
            console.log(error);

            if (error.response?.data.error)
                setMsg(error.response?.data.error);
            else
                setMsg("Erro ao criar conta. Tente novamente mais tarde.");
        }

    }


    return <>
        <Navbar />
        <div className="container-fluid justify-content-center align-items-center mt-page">
            <div className="container mt-5 border p-3 rounded shadow">
                <h3>📄 Ficha de Cadastro de Técnicos</h3>
                <form className="mt-4">
                    <div className="mb-3">
                        <label className="form-label">Nome do Técnico</label>
                        <input
                            type="text"
                            name="escola"
                            className="form-control"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Celular</label>
                        <input
                            type="tel"
                            name="Celular"
                            placeholder="Celular"
                            className="form-control"
                            onChange={(e) => setCel_phone(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Endereço</label>
                        <input type="text" placeholder="Endereço"
                            className="form-control"
                            onChange={(e) => setEndereco(e.target.value)} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Skill</label>
                        <input type="text" placeholder="Skill"
                            className="form-control"
                            onChange={(e) => setSpecialty(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">E-mail</label>
                        <input type="email" placeholder="E-mail"
                            value={email}
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mt-2 position-relative">
                        <input type={visible ? "text" : "password"} placeholder="Senha"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)} />
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

                    <div className="mt-3 mb-5">
                        <button onClick={ExecuteAccount} className="btn btn-primary w-100" type="button">
                            Cadastrar técnico
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>
}

export default RegisterTecnicoComponent;