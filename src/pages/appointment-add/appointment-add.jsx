import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx";
import { useEffect, useState } from "react";
import api from "../../constants/api.js";

import { ToastContainer, toast } from 'react-toastify';

function AppointmentAdd() {

    const navigate = useNavigate();
    const { id_appointment } = useParams();
    const [users, setUsers] = useState([]);
    const [barbers, setBarbers] = useState([]);
    const [services, setServices] = useState([]);

    const [idUser, setIdUser] = useState("");
    const [idBarber, setIdBarber] = useState("");
    const [idService, setIdService] = useState("");
    const [bookingDate, setBookingDate] = useState("");
    const [bookingHour, setBookingHour] = useState("");

    async function LoadUsers() {
        try {
            const response = await api.get("/admin/users");

            if (response.data) {
                setUsers(response.data);
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar pacientes");
        }
    }

    async function LoadBarbers() {
        try {
            const response = await api.get("/barbers");

            if (response.data) {
                setBarbers(response.data);
                if (id_appointment > 0) {
                    LoadAppointment(id_appointment);
                }
            }
        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");
                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar médicos.");
        }
    }


    async function LoadAppointment(id) {

        try {
            const response = await api.get("/admin/agenda/" + id);

            if (response.data) {
                setIdUser(response.data.id_user);
                setIdBarber(response.data.id_barber);
                setIdService(response.data.id_service);
                setBookingDate(response.data.booking_date);
                setBookingHour(response.data.booking_hour);
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar serviços");
            navigate("/appointments");
        }
    }

    async function LoadServices(id) {

        if (!id)
            return;

        try {
            const response = await api.get("/barbers/" + id + "/services");

            if (response.data) {
                setServices(response.data);
            }

        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao listar serviços");
        }
    }

    async function SaveAppointment() {
        const json = {
            id_user: idUser,
            id_barber: idBarber,
            id_service: idService,
            booking_date: bookingDate,
            booking_hour: bookingHour
        };

        try {
            const response = id_appointment > 0 ?
                await api.put("/admin/agenda/" + id_appointment, json)
                :
                await api.post("/admin/agenda", json);

            // if (response.data?.id_appointment) {
            if (response.data) {
                toast("Agendamento realizado com sucesso!")
                setTimeout(() => {
                    navigate("/appointments");
                }, 5000);
            }
            // else {
            //     toast("Data indisponível, selecione outro Horário ou dia por gentileza.",
            //      setTimeout(() => {
            //          setBookingDate(""), setBookingHour("")                    
            //      }, 6000))
            // }
        } catch (error) {
            if (error.response?.data.error) {
                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao salvar dados");
        }
    }

    useEffect(() => {
        LoadUsers();
        LoadBarbers();
         // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect(() => {
        LoadServices(idBarber);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idBarber]);

    return <>
        <ToastContainer
            className='Toastify__toast-body'
            autoClose={5000}
            closeOnClick
            position="top-center" />
        <Navbar />
        <div className="container-fluid mt-page mb-5">
            <div className="row col-lg-4 offset-lg-4 rounded shadow-lg px-4 py-3">
                <div className="col-12 mt-1 text-center">
                    <h2>
                        {
                            id_appointment > 0 ? "Editar Agendamento" : "Novo Agendamento"
                        }
                    </h2>
                </div>

                <div className="col-12 mt-2">
                    <label htmlFor="user" className="form-label">Cliente</label>
                    <div className="form-control mb-2">
                        <select name="user" id="user"
                            value={idUser} onChange={(e) => setIdUser(e.target.value)} >
                            <option value="0">Selecione o Cliente</option>
                            {users.rows?.map((u) => {
                                return (
                                    <option key={u.id_user} value={u.id_user} >{u.name}</option>
                                )
                            })}

                        </select>

                    </div>
                </div>

                <div className="col-12 mt-2">
                    <label htmlFor="Barber" className="form-label">Barbeiro</label>
                    <div className="form-control mb-2">
                        <select name="Barber" id="Barber"
                            value={idBarber} onChange={(e) => setIdBarber(e.target.value)} >
                            <option value="0">Selecione o barbeiro</option>
                            {barbers.map(d => {
                                return <option key={d.id_barber} value={d.id_barber}>{d.name}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className="col-12 mt-2">
                    <label htmlFor="service" className="form-label">Serviço</label>
                    <div className="form-control mb-2">
                        <select name="service" id="service"
                            value={idService} onChange={(e) => setIdService(e.target.value)} >
                            <option value="0">Selecione o serviço</option>
                            {services.map(s => {
                                return <option key={s.id_service}
                                    value={s.id_service}>{s.description}</option>
                            }
                            )
                            }
                        </select>
                    </div>
                </div>

                <div className="col-6 mt-2">
                    <label htmlFor="bookingDate" className="form-label">Data</label>
                    <input type="date" className="form-control" name="bookingDate" id="bookingDate"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                    />
                </div>

                <div className="col-6 mt-2">
                    <label htmlFor="bookingHour" className="form-label">Horário</label>
                    <div className="form-control mb-2">
                        <select name="bookingHour" id="bookingHour"
                            value={bookingHour} onChange={(e) => setBookingHour(e.target.value)} >
                            <option value="00:00">Horário</option>
                            <option value="08:00">08:00</option>
                            <option value="09:00">09:00</option>
                            <option value="09:30">09:30</option>
                            <option value="10:00">10:00</option>
                            <option value="10:30">10:30</option>
                            <option value="11:00">11:00</option>
                            <option value="11:00">Almoço</option>
                            <option value="11:30">Almoço</option>
                            <option value="12:00">Almoço</option>
                            <option value="12:30">Almoço</option>
                            <option value="13:00">13:00</option>
                            <option value="13:30">13:30</option>
                            <option value="14:00">14:00</option>
                            <option value="14:30">14:30</option>
                            <option value="15:00">15:00</option>
                            <option value="15:30">15:30</option>
                            <option value="16:00">16:00</option>
                            <option value="16:30">16:30</option>
                            <option value="17:00">17:00</option>
                            <option value="17:30">17:30</option>
                            <option value="18:00">18:00</option>
                            <option value="18:30">18:30</option>
                        </select>
                    </div>
                </div>

                <div className="col-12 mt-3">
                    <div className="d-flex justify-content-end">
                        <Link to="/appointments"
                            className="btn btn-outline-primary me-3">
                            Cancelar
                        </Link>
                        <button
                            onClick={SaveAppointment}
                            className="btn btn-primary" type="button">
                            Salvar Dados
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AppointmentAdd;