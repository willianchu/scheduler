import React from "react";
import "./styles.scss";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";



export default function Form(props){
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off">
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            /*
              This must be a controlled component
              your code goes here
            */
          />
        </form>
        <InterviewerList 
          /* your code goes here */
          interviewers={props.interviewers}
          value={3}
          onChange={props.onChange}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={props.onCancel}>Cancel</Button>
          <Button confirm onClick={props.onSave}>Save</Button>
        </section>
      </section>
    </main>
  );
};



// Refactor the hard coded content to use props & state

// The Form component should track the following state:

// student:String
// interviewer:Number
// The Form component should have the following actions:

// setStudent:Function
// setInterviewer:Function
// The Form component should take the following props:

// student:String
// interviewers:Array
// interviewer:Number
