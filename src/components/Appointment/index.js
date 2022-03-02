import React, { Fragment } from 'react';
import './styles.scss';
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Confirm from './Confirm';
import useVisualMode from 'hooks/useVisualMode';
import Status from './Status';
import Error from './Error';

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const EDIT = "EDIT";
  
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
      return {
        id: interviewer.id,
        name: interviewer.name,
        avatar: interviewer.avatar
      }
    });
  
  const deleteAction = () => {
    const id = props.id;
    transition(SAVING);
    console.log("Index/deleting action/id",id);
    props.cancelInterview(id, transition);
  }

  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer,
    }; 
    const id = props.id;

    console.log("index/save/inputBookInterview 1 2 3",interview.student,interview.interviewer,id);
    transition(SAVING);
    console.log("promise >>>>>>>>>>>>>>>>>");
    
    props.bookInterview(id, interview, transition)
        // .then((res) => {
        //   console.log("promise <<<<<<<<<<<<<<<<<<<", res);
        //   transition(SHOW);
        // })
        // .catch(error => {
        //   console.log("ERROR updating",error);
        //   transition(ERROR_SAVE, true)
        // });
      
  }
 
  const editAction = (interviewer) => {
    transition(EDIT);
    console.log("index/edit action",interviewer);
    

  }
  function destroy(event) {
    transition(DELETING, true);
    props
     .cancelInterview(props.id)
     .then(() => transition(EMPTY))
     .catch(error => {
       console.log("destroy error",error);
       transition(ERROR_DELETE, true)
     });
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