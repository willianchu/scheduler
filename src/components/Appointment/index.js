import React, { Fragment } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  //const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  //const ERROR_SAVE = "ERROR_SAVE";
  // const ERROR_DELETE = "ERROR_DELETE";
  const EDIT = "EDIT";
  

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  const showAppointment = () => {
  const interview = {...props.interview}; // copy interview object
  console.log("showAppointment interview", interview.id);
  const student = interview.student; // get student name
  const interviewer = {...interview.interviewer}; // copy interviewer object
  console.log("showAppointment interviewer", interviewer.id);
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
  const deleteAction = () => {
    transition(SAVING);
    console.log("deleting action",props.id);
    console.log("deleting what you want");
    props.cancelInterview(props.id);
    transition(EMPTY);
  }
    const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    }; 
    
    console.log("save",interview.student,interview.interviewer,props.id);
    props.bookInterview(props.id,interview);

  }
  const createAction = (student, interviewer) => {
    transition(SAVING);
    console.log("create action",props.id);
    console.log("create what you want");
    save(student, interviewer);
    transition(SHOW);
  }
  
  const editAction = (interviewer) => {
    transition(EDIT);
    console.log("edit action",interviewer);
    

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
            <Form student="" interviewers={interviewers} onChange={()=>console.log("onChange Create")} onSave={createAction} onCancel={()=>back()}/>}
          {mode === EDIT && 
            <Form student={student} interviewer={interviewer.id} interviewers={interviewers} onChange={()=>console.log("onChange Edit")} onSave={createAction} onCancel={()=>back()}/>}
          {mode === SHOW && (
            <Show student={student} interviewer={interviewer} onEdit={editAction} onDelete={()=>transition(CONFIRM)} />)}
          {mode === CONFIRM && 
            <Confirm onConfirm={deleteAction} message="Delete this appointment?" onCancel={()=>back()} />}
          {mode === SAVING &&
            <Status message="Saving" />}
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