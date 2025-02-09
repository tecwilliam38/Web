import { useNavigate } from "react-router-dom";
import api from "../../constants/api";
import { useEffect, useState } from "react";

function Appointment(props) {
    //2024-11-15T08:30:00
    const dt = new Date(props.booking_date);
    // const dt = new Date(props.booking_date);

    // caso a data pare de funcionar, tem essa alternativa:
    // let data = new Date(props.booking_date);
    // const dataBooking = new Intl.DateTimeFormat('pt-BR', { dataStyle: "short" }).format(data)

    return <tr>
        <td>{props.cliente}</td>
        <td>{props.barber}</td>
        <td>{props.service}</td>
        <td>
            {new Intl.DateTimeFormat("pt-br", { dataStyle: "short" }).format(dt)}-{props.booking_hour}h
        </td>
        <td className="text-end">{
            new Intl.NumberFormat("pt-br", { style: 'currency', currency: 'BRL' }).format(props.price)
        }</td>
        <td className="text-end">
            <div className="d-inline">
                <button onClick={() => props.clickEdit(props.id_appointment)}
                    className="btn btn-sm btn-primary me-3">
                    <i className="bi bi-pencil-square"></i>
                </button>
            </div>
            <button onClick={() => props.clickDelete(props.id_appointment)}
                className="btn btn-sm btn-danger">
                <i className="bi bi-trash"></i>
            </button>
        </td>
    </tr>
}

export default Appointment;
