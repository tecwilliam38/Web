import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx"
import { useCallback, useEffect, useState } from "react";
import api from "../../constants/api.js";
import Appointment from "../../components/appointment/appointment.jsx";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import * as Icon from 'react-bootstrap-icons';
import 'bootstrap-icons/font/bootstrap-icons.css';
import CookieBanner from "../../components/cookiebanner/index.jsx";
import { useAuth } from "../../constants/authContext.jsx";
import { toast, ToastContainer } from "react-toastify";


function Appointments() {

    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [tecnicos, setTecnicos] = useState([]);

    const [idBarber, setIdBarber] = useState("");
    const [idTecnico, setIdTecnico] = useState("");
    const [dtStart, setDtStart] = useState("");
    const [dtEnd, setDtEnd] = useState("");

    const { user } = useAuth();

    // const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    function ClickEdit(id_appointment) {
        navigate("/appointments/edit/" + id_appointment, {
            headers: { Authorization: `Bearer ${user.token}` }
        })
    }

    function ClickDelete(id_appointment) {
        confirmAlert({
            title: "Exclusão",
            message: "Confirma exclusão desse agendamento?",
            buttons: [
                {
                    label: "Sim",
                    onClick: () => DeleteAppointment(id_appointment)
                },
                {
                    label: "Não",
                    onClick: () => { }
                }
            ],
            overlayClassName: "overlay-custom-class-name"
        });
    }

    async function DeleteAppointment(id) {
        try {
            const response = await api.delete("/appointments/" + id, {
                headers: { Authorization: `Bearer ${user.token}` }
            });
            if (response?.data) {
                toast("Agendamento excluído com sucesso!")
                setTimeout(() => {
                    LoadAppointments();
                }, 5000);
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao excluir reserva");
        }
    }
    const LoadAppointments = useCallback(async () => {
        try {
            const response = await api.get("/appointments/listar",
                {
                    headers: { Authorization: `Bearer ${user.token}` },

                    params: { id_tecnico: idBarber, dt_start: dtStart, dt_end: dtEnd }
                });
            if (response.data) {
                setAppointments(response.data);
            }
        } catch (error) {
            console.error(error);
        }
    }, [idBarber, dtStart, dtEnd]);

    async function LoadTecnicos() {
    
            try {
                const response = await api.get("/tecnicos/listar", {
            headers: { Authorization: `Bearer ${user.token}` }
        });
    
                if (response.data) {
                    setTecnicos(response.data);
                }
    
            } catch (error) {
                if (error.response?.data.error) {
                    if (error.response.status == 401)
                        return navigate("/");
    
                    alert(error.response?.data.error);
                }
                else
                    alert("Erro ao listar técnicos.");
            }
        }

    useEffect(() => {
        LoadTecnicos();
        LoadAppointments();
    }, []);


    function ChangeTecnico(e) {
        setIdTecnico(e.target.value);
    }
// Inep add
    return (
        <div className="container-fluid mt-page">
            <ToastContainer
                className='Toastify__toast-body'
                autoClose={5000}
                closeOnClick
                position="top-center" />
            <CookieBanner />
            <Navbar />
            <div className="row">
                <div className="col-1 col-xg-12 bg-dark">
                    <ul class="nav flex-column mb-5">
                        <li class="nav-item">
                            <Link className="p-3">
                                <i className="bi bi-speedometer2" style={{ fontSize: '3rem', color: '#fff' }}></i>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link className="p-3">
                                <i className="bi bi-map-fill" style={{ fontSize: '2.3rem', color: '#fff' }}></i>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link className="p-3">
                                <i className="bi bi-calendar3" style={{ fontSize: '2.3rem', color: '#fff' }}></i>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link className="p-3">
                                <i className="bi bi-geo-alt-fill" style={{ fontSize: '2.3rem', color: '#fff' }}></i>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link className="p-3">
                                <i className="bi bi-person-fill" style={{ fontSize: '2.3rem', color: '#fff' }}></i>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link className="p-3">
                                <i className="bi bi-people-fill" style={{ fontSize: '2.3rem', color: '#fff' }}></i>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link className="p-3">
                                <i className="bi bi-graph-up" style={{ fontSize: '2.3rem', color: '#fff' }}></i>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link className="p-3">
                                <i className="bi bi-gear-fill" style={{ fontSize: '2.3rem', color: '#fff' }}></i>
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="col-11 col-xg-12">

                    <div className="d-flex justify-content-between align-items-center mb-4 mt-5 p-2">
                        <div>
                            <h2 className="d-inline me-5 h4 text-dark">Agendamentos</h2>
                            <Link to="/appointments/add" className="btn btn-outline-primary">Novo Agendamento </Link>
                        </div>
                        <div className="d-flex nav-right justify-content-end">
                            <input id="startDate" className="form-control" type="date"
                                onChange={(e) => setDtStart(e.target.value)} />
                            <span className="m-2">Até</span>
                            <input id="endtDate" className="form-control" type="date"
                                onChange={(e) => setDtEnd(e.target.value)} />
                            <div className="form-control ms-2 me-2">
                                <select name="barber" id="barber" value={idBarber} onChange={ChangeTecnico}>
                                    <option value="">Todos os Técnicos</option>
                                    {
                                        tecnicos?.map((data) => {
                                            return <option key={data.id_tecnico}
                                                value={data.id_tecnico}>
                                                {data.name}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>
                            <button onClick={LoadAppointments} className="btn btn-outline-secondary" type="button">Filtrar</button>
                        </div>
                    </div>


                    <table className="table table-hover shadow rounded">
                        <thead>
                            <tr className="border">
                                <th scope="col" className="h5">Cliente</th>
                                <th scope="col" className="h5">Técnico</th>
                                <th scope="col" className="h5">Serviço</th>
                                <th scope="col" className="h5">Data/Hora</th>
                                <th scope="col" className="h5">Estado</th>
                                <th scope="col" className="h5">Preço</th>
                                <th scope="col" className="h5 text-end">Competências</th>
                                <th scope="col" className="col-buttons"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {appointments?.map((ap) => {
                                return (<Appointment
                                    key={ap.id_appointment}
                                    id_appointment={ap.id_appointment}
                                    service={ap.service}
                                    tecnico={ap.tecnico}
                                    client={ap.cliente}
                                    price={ap.preco}
                                    skills={ap.specialty}
                                    status={ap.status}
                                    booking_date={ap.booking_date}
                                    booking_hour={ap.booking_hour}
                                    clickEdit={ClickEdit}
                                    clickDelete={ClickDelete}
                                />
                                )
                            })}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    )
}

export default Appointments;