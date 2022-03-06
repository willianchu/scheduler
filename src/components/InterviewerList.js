import React from "react";
import PropTypes from 'prop-types'; // ES6
import InterviewerListItem from"components/InterviewerListItem";

export default function InterviewerList(props){
  
  const copy = [...props.interviewers];
  const data = copy || []; // if undefined, set an empty array
  const interviewers = data.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    );
  });
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  )
}

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};