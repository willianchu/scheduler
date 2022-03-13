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
  
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const showAppointment = () => {
  const interview = {...props.interview}; // copy interview object
  const student = interview.student; // get student name
  const interviewer = {...interview.interviewer} || []; // copy interviewer object
  const interviewersArray = props.interviewers? [...props.interviewers] : []; // copy interviewers array

  // transform interviewers props object to array
  const interviewers = Object.values(interviewersArray).map(interviewer => { 
      return interviewer === undefined ? null : {
        id: interviewer.id,
        name: interviewer.name,
        avatar: interviewer.avatar
      }
    });
  
  const deleteAction = () => { // delete action on click
    const id = props.id;
    transition(DELETING, true);
    props.cancelInterview(id, transition, DELETING);
  }

  const save = (name, interviewer) => { // save action on click
    const interview = {
      student: name,
      interviewer,
    }; 
    const id = props.id;
    transition(SAVING);
    props.bookInterview(id, interview, transition)
  }
 
  const editAction = (interviewer) => { // edit action on click
    transition(EDIT);
  }

  function destroy(event) { // back to original mode action on click
    back();
   }
  
  if (props.time === undefined) { // if no time is selected
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