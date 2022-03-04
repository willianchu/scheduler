const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3],
      interviewers: [ 1, 4, 5 ],
      spots: 0
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5],
      interviewers: [ 2, 3 ],
    }
  ],
  appointments: {
    "1": { id: 1, time: "12pm", interview: null },
    "2": { id: 2, time: "1pm", interview: null },
    "3": {
      id: 3,
      time: "2pm",
      interview: { student: "Archie Cohen", interviewer: 2 }
    },
    "4": { id: 4, time: "3pm", interview: null },
    "5": {
      id: 5,
      time: "4pm",
      interview: { student: "Chad Takahashi", interviewer: 2 }
    }
  },
  interviewers: {
    "1": {  
      "id": 1,
      "name": "Sylvia Palmer",
      "avatar": "https://i.imgur.com/LpaY82x.png"
    },
    "2": {
      id: 2,
      name: "Tori Malcolm",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "3": {
      id: 3,
      name: "Prankster",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "4": {
      id: 4,
      name: "Bunny",
      avatar: "https://i.imgur.com/Nmx0Qxo.png"
    },
    "5": {
      id: 5,
      name: "Bun",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  }
};
function getInterviewersForDay (_state, _day) {
  const days = [..._state.days]; 
  const interviewers = {..._state.interviewers};
  // filter the days array to find the day
  const dayInterviewers = days.filter(singleDay => singleDay.name === _day);
   
  // filter the interviewers object to find the interviewers for the day
  const interviewersArray = dayInterviewers[0].interviewers;
  
  const result = [];
  for(let element of interviewersArray) {
    result.push(interviewers[element]);
    }
  
  return result;
}

console.log(getInterviewersForDay(state, "Monday").length);
console.log(getInterviewersForDay(state, "Tuesday")[0]);
console.log(getInterviewersForDay(state, "Tuesday")[1]);