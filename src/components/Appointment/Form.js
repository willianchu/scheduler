import React, { useState } from "react";
import "./styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



export default function Form(props){
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const interviewers = [...props.interviewers];
  const [placeH, setPlaceH] = useState(false);
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  const cancel = () => {
    reset();
    props.onCancel();
  }
 
  const submitHandler = (event) => {
    event.preventDefault();
    
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={submitHandler}>
          <input 
            data-testid="student-name-input"
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            
            value={student}
            onChange={(e) => setStudent(e.target.value)}
          />
        </form>
        <InterviewerList 
          /* your code goes here */
          interviewers={interviewers}
          value={interviewer}
          onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          { placeH===true && student==="" ? <p className="appointment__validation-message">student name cannot be blank!!</p> : null }
          { placeH===true && interviewer===null ? <p className="appointment__validation-message">must assign an interviewer!!</p> : null }
          <Button danger onClick={cancel}>Cancel</Button>
          { student==="" || interviewer===null ? <Button confirm onClick={()=>setPlaceH(true)}>Save</Button> : <Button confirm onClick={()=>props.onSave(student,interviewer)}>Save</Button> }
        </section>
      </section>
    </main>
  );
};
