import PropTypes from 'prop-types';
import { useState } from 'react';

Appointment.propTypes = {
    booking_date: PropTypes.date,
    booking_hour: PropTypes.DateTimeFormat,
    client: PropTypes.string,
    tecnico: PropTypes.string,
    service: PropTypes.string,
    price: PropTypes.number,
    status: PropTypes.string,
    clickEdit: PropTypes.func,
    id_appointment: PropTypes.number,
    clickDelete: PropTypes.func,
}


function Appointment(props) {

    const dt = new Date(props.booking_date);
    const preco = new Intl.NumberFormat("pt-br", { style: 'currency', currency: 'BRL' }).format(props.price);
    function ChangeStatus(e) {
        setStatus(e.target.value);
    }
    return <tr>
        <td>{props.client}</td>
        <td>{props.tecnico}</td>
        <td>{props.service}</td>
        <td>
            {new Intl.DateTimeFormat("pt-br", { dataStyle: "short" }).format(dt)}-{props.booking_hour}h
        </td>
        <td>{props.status}</td>
        <td>{preco}</td>
        <td className="text-end">{props.skills}</td>
        <td className="text-end justify-content-between">
            <button onClick={() => props.clickEdit(props.id_appointment)}
                className="btn btn-sm btn-primary my-2">
                <i className="bi bi-pencil-square"></i>
            </button>
            <button onClick={() => props.clickDelete(props.id_appointment)}
                className="btn btn-sm btn-danger">
                <i className="bi bi-trash"></i>
            </button>
        </td>
    </tr>
}

export default Appointment;
