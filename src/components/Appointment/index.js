import React, { Fragment } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';

export default function Appointment(props) {

const showAppointment = () => {
    const interview = {...props.interview}; // copy interview object
    const student = interview.student; // get student name
    const interviewer = {...interview.interviewer}; // copy interviewer object

    
  if (props.time === undefined) {
    return (
      <Fragment>
        <Header time="No Appointments" />
        <Empty />
      </Fragment>
      );
  } else if (props.interview === undefined) {
      return (
        <Fragment>
        <Header time={props.time} />
        <Empty />
        </Fragment>
      );
  } else {
    console.log()
      return (
        <Fragment>
        <Header time={props.time} />
        { <Show student={student} interviewer={interviewer} onEdit={props.onEdit} onDelete={props.onDelete} /> }
        </Fragment>
      );
    };
};


return (
  <article className="appointment">
    {showAppointment()}
  </article>
);

}