function getInterviewersForDay (state, day) {
  const days = [...state.days]; // copy the array
  const interviewers = {...state.interviewers}; // copy the object
 
  // filter the days array to find the day
  const dayInterviewers = days.filter(appointment => appointment.name === day);
  if (dayInterviewers.length === 0) { // if the day is not found
    return [];
  }
  
  // filter the interviewers object to find the interviewers for the day
  const interviewersArray = dayInterviewers[0].appointments;
  
  if (interviewersArray === undefined) { // if the day has no interviewers
    return [];
  }
  const result = interviewersArray.map(interviewer => interviewers[interviewer]);
  return result;
}

const state = {
  days: [
    {
      id: 1,
      name: "Monday",
      appointments: [1, 2, 3]
    },
    {
      id: 2,
      name: "Tuesday",
      appointments: [4, 5]
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
      avatar: "https://i.imgur.com/LpaY82x.png"
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


console.log(getInterviewersForDay(state, "Tuesday"));