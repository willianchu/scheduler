import React from 'react';
import './styles.scss';

export default function Appointment(props) {

const showAppointment = () => {
  if (props.time === undefined) {
    return (
      <h2>No Appointments</h2>
    );
  } else {
    return (
      <h2>{props.time}</h2>
    );
  };
};


return (
  <article className="appointment">
    {showAppointment()}
  </article>
);

}