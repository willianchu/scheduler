import React from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames";

export default function InterviewerListItem(props) {

  const interviewerClass = classNames("Interviewers__item", {
  "interviewers__item--selected": props.selected,
 });
  
    
  return (
    <li className={interviewerClass} 
    onClick={() => props.setInterviewer(props.id)}>
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
  
}

// Therefore, the InterviewerListItem component should receive the following props:

// id:number - the id of the interviewer
// name:string - the name of the interviewer
// avatar:url - a url to an image of the interviewer
// The InterviewerListItem also needs a prop to know if it is selected.

// selected:boolean - determines if an interviewer is selected or not and displays the name and applies appropriate styles if selected.
// Finally, the InterviewerListItem should receive a function called setInterviewer.

// setInterviewer:function - is run when the InterviewerListItem is clicked. This function receives the interviewer's id as an argument. It sets the selected interviewer.