import './styles.scss';
import React, { Fragment } from 'react';
import Show from './Show';
import Form from './Form';
import Error from './Error';
import Empty from './Empty';
import Status from './Status';
import Header from './Header';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';

export default function Appointment(props) {
  const EDIT = "EDIT";
  const SHOW = "SHOW";
  const EMPTY = "EMPTY";
  const SAVING = "SAVING";
  const CREATE = "CREATE";
  const CONFIRM = "CONFIRM";
  const DELETING = "DELETING";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  
  console.log("interview",props.appointment, "flag", props.interview);
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const showAppointment = () => {
  const interview = {...props.interview}; // copy interview object
  const student = interview.student; // get student name
  const interviewer = {...interview.interviewer}; // copy interviewer object
  const interviewersArray = [...props.interviewers]; // copy interviewers array
     // transform interviewers props object to array
  
  const interviewers = Object.values(interviewersArray).map(interviewer => {
      return interviewer === undefined ? null : {
        id: interviewer.id,
        name: interviewer.name,
        avatar: interviewer.avatar
      }
    });
  
  const deleteAction = () => {
    const id = props.id;
    transition(SAVING);
    props.cancelInterview(id, transition);

  }

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    }; 
    const id = props.id;

    transition(SAVING);
    console.log("SAVING", interview);
    props.bookInterview(id, interview, transition)
  }
 
  const editAction = (interviewer) => {
    transition(EDIT);
    console.log("index/edit action",interviewer);
    

  }

  function destroy(event) {
    transition(DELETING, true);
    props
     .cancelInterview(props.id, transition)

   }

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
            <Form student=""  interviewers={interviewersArray} onChange={()=>console.log("onChange Create")} onSave={save} onCancel={()=>back()}/>}
          {mode === EDIT && 
            <Form student={student} interviewer={interviewer.id} interviewers={interviewers} onChange={()=>console.log("onChange Edit")} onSave={save} onCancel={()=>back()}/>}
          {mode === SHOW && (
            <Show student={student} interviewer={interviewer} onEdit={editAction} onDelete={()=>transition(CONFIRM)} />)}
          {mode === CONFIRM && 
            <Confirm onConfirm={deleteAction} message="Delete this appointment?" onCancel={()=>back()} />}
          {mode === SAVING &&
            <Status message="Saving" />}
          {mode === DELETING &&
            <Status message="Deleting" />}
          {mode === ERROR_SAVE &&
            <Error message="Error Saving" onClose={destroy} />}
          {mode === ERROR_DELETE &&
            <Error message="Error Deleting" onClose={destroy} />}
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