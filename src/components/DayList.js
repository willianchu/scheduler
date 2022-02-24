import React from "react";
import DayListItem from"components/DayListItem";

export default function DayList(props){

  const days = props.days.map((element) => {
    return (
      <DayListItem
        key={element.id}
        name={element.name}
        spots={element.spots}
        selected={element.name === props.day}
        setDay={() => props.setDay(element.name)}
      />
    );
  });


  return(
    <ul>
      {days}
    </ul>
  )
}
