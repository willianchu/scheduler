import React from "react";
import InterviewerListItem from"components/InterviewerListItem";

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

export default function InterviewerList(props){
  
 
  return(
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        <InterviewerListItem
          key={props.interviewers[0].id}
          id={props.interviewers[0].id}
          name={props.interviewers[0].name} 
          avatar={props.interviewers[0].avatar} 
          selected={props.interviewers[0].id===props.interviewer}
          setInterviewer={props.setInterviewer} />
        <InterviewerListItem
          key={props.interviewers[1].id}
          id={props.interviewers[1].id}
          name={props.interviewers[1].name}
          avatar={props.interviewers[1].avatar}
          selected={props.interviewers[1].id===props.interviewer}
          setInterviewer={props.setInterviewer}   />
        <InterviewerListItem
          key={props.interviewers[2].id}
          id={props.interviewers[2].id}
          name={props.interviewers[2].name}
          avatar={props.interviewers[2].avatar}
          selected={props.interviewers[2].id===props.interviewer}
          setInterviewer={props.setInterviewer}   />
        <InterviewerListItem
          key={props.interviewers[3].id}
          id={props.interviewers[3].id}
          name={props.interviewers[3].name}
          avatar={props.interviewers[3].avatar}
          selected={props.interviewers[3].id===props.interviewer}
          setInterviewer={props.setInterviewer}   />
        <InterviewerListItem
          key={props.interviewers[4].id}
          id={props.interviewers[4].id}
          name={props.interviewers[4].name}
          avatar={props.interviewers[4].avatar}
          selected={props.interviewers[4].id===props.interviewer}
          setInterviewer={props.setInterviewer}   />  
      </ul>
    </section>
  )
}
