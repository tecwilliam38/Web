import PropTypes from 'prop-types';

Appointment.propTypes = {
    booking_date: PropTypes.date,
    booking_hour: PropTypes.DateTimeFormat,
    client: PropTypes.string,
    tecnico: PropTypes.string,
    service: PropTypes.string,
    price: PropTypes.number,
    clickEdit: PropTypes.func,
    id_appointment: PropTypes.number,
    clickDelete: PropTypes.func,
}


function Appointment(props) {
    //2024-11-15T08:30:00    
    console.log(props.price);

    const dt = new Date(props.booking_date);
    const preco = new Intl.NumberFormat("pt-br", { style: 'currency', currency: 'BRL' }).format(props.price);

    return <tr>
        <td>{props.client}</td>
        <td>{props.tecnico}</td>
        <td>{props.service}</td>
        <td>
            {new Intl.DateTimeFormat("pt-br", { dataStyle: "short" }).format(dt)}-{props.booking_hour}h
        </td>
        <td>{preco}</td>
        <td className="text-end">{props.skills}</td>
        <td className="text-end justify-content-between">
            {/* <div className="d-inline me-3"> */}
                <button onClick={() => props.clickEdit(props.id_appointment)}
                    className="btn btn-sm btn-primary my-2">
                    <i className="bi bi-pencil-square"></i>
                </button>
                <button onClick={() => props.clickDelete(props.id_appointment)}
                    className="btn btn-sm btn-danger">
                    <i className="bi bi-trash"></i>
                </button>
            {/* </div> */}
        </td>
    </tr>
}

export default Appointment;
