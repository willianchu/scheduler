import React, { Fragment } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const showAppointment = () => {
  const interview = {...props.interview}; // copy interview object
  const student = interview.student; // get student name
  const interviewer = {...interview.interviewer}; // copy interviewer object
  const interviewersArray = [...props.interviewers]; // copy interviewers array
     // transform interviewers props object to array
    console.log("show",interviewersArray);
    const interviewers = Object.values(interviewersArray).map(interviewer => {
      return {
        id: interviewer.id,
        name: interviewer.name,
        avatar: interviewer.avatar
      }
    });
    
  if (props.time === undefined) {
    return (
      <Fragment>
        <Header time="No Appointments" />
        <Empty />
      </Fragment>
      );
  } else {
      return (
        <Fragment>
        <Header time={props.time} />
          {mode === EMPTY && 
            <Empty onAdd={() => transition(CREATE)} />}
          {mode === CREATE && 
            <Form id={props.id} student="" interviewers={interviewers} onChange={()=>console.log("onChange")} onSave={(props.save)} transitionShow={()=>transition(SHOW)} onCancel={()=>back()}/>}
          {mode === SHOW && (
            <Show student={student} interviewer={interviewer} onEdit={props.onEdit} onDelete={props.onDelete} />)}
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