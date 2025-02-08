import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/navbar.jsx"
import { useEffect, useState } from "react";
import api from "../../constants/api.js";
import Appointment from "../../components/appointment/appointment.jsx";
import { confirmAlert } from "react-confirm-alert";
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css



function Appointments() {

    const navigate = useNavigate();
    const [appointments, setAppointments] = useState([]);
    const [barbers, setBarbers] = useState([]);

    const [idBarber, setIdBarber] = useState("");
    const [dtStart, setDtStart] = useState("");
    const [dtEnd, setDtEnd] = useState("");

    function ClickEdit(id_appointment) {
        navigate("/appointments/edit/" + id_appointment)
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
            const response = await api.delete("/agenda/" + id);

            if (response.data) {
                LoadAppointments();
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

    async function LoadBarbers() {
        try {
            const response = await api.get("/barbers");

            if (response.data) {
                setBarbers(response.data);
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

    async function LoadAppointments() {

        try {
            const response = await api.get("/admin/agenda", {
                params: {
                    id_barber: idBarber,
                    dt_start: dtStart,
                    dt_end: dtEnd
                }
            });

            if (response.data) {
                setAppointments(response.data);
            }

        } catch (error) {
            if (error.response?.data.error) {

                if (error.response.status == 401)
                    return navigate("/");

                alert(error.response?.data.error);
            }
            else
                alert("Erro ao efetutar login. Tente novamente mais tarde.");
        }
    }


    function ChangeBarber(e) {
        setIdBarber(e.target.value);
    }


    useEffect(() => {
        LoadBarbers();
        LoadAppointments();
    }, []);

    return (
        <div className="container-fluid mt-page">
            <Navbar />
            <div className="d-flex justify-content-between align-items-center mb-4 p-2">
                <div>
                    <h2 className="d-inline me-5">Agendamentos</h2>
                    <Link to="/appointments/add" className="btn btn-outline-primary">Novo Agendamento </Link>
                </div>
                <div className="d-flex nav-right justify-content-end">
                    <input id="startDate" className="form-control" type="date"
                        onChange={(e) => setDtStart(e.target.value)} />
                    <span className="m-2">Até</span>
                    <input id="endtDate" className="form-control" type="date"
                        onChange={(e) => setDtEnd(e.target.value)} />
                    <div className="form-control ms-2 me-2">
                        <select name="barber" id="barber" value={idBarber} onChange={ChangeBarber}>
                            <option value="">Todos os Barbeiros</option>
                            {
                                barbers.map((data) => {
                                    return <option key={data.id_barber}
                                        value={data.id_barber}>
                                        {data.name}
                                    </option>
                                })
                            }
                        </select>
                    </div>
                    <button onClick={LoadAppointments} className="btn btn-primary" type="button">Filtrar</button>
                </div>
            </div>

            
                <table className="table table-hover shadow rounded">
                    <thead>
                        <tr>
                            <th scope="col">Cliente</th>
                            <th scope="col">Barbeiro</th>
                            <th scope="col">Serviço</th>
                            <th scope="col">Data/Hora</th>
                            <th scope="col" className="text-end">Valor</th>
                            <th scope="col" className="col-buttons"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments?.map((ap) => {
                            return (
                                <>
                                    <Appointment
                                        key={ap.id_appointment}
                                        id_appointment={ap.id_appointment}
                                        service={ap.service}
                                        barber={ap.barber}
                                        cliente={ap.user}
                                        price={ap.price}
                                        booking_date={ap.booking_date}
                                        booking_hour={ap.booking_hour}
                                        clickEdit={ClickEdit}
                                        clickDelete={ClickDelete}
                                    />
                                </>
                            )
                        })}
                    </tbody>
                </table>
            
        </div>
    )
}

export default Appointments;