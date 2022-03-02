export function getAppointmentsForDay (state, day) {
  const days = [...state.days]; 
  const appointments = {...state.appointments};
  // filter the days array to find the day
  const dayAppointments = days.filter(appointment => appointment.name === day);
  if (dayAppointments.length === 0) { // if the day is not found
    return [];
  }
  // filter the appointments object to find the appointments for the day
  const appointmentsArray = dayAppointments[0].appointments;
  if (appointmentsArray.length === 0) { // if the day has no appointments
    return [];
  }
  // filter the appointments object to find the appointments for the day
  const result = appointmentsArray.map(appointment => appointments[appointment]);
  return result;
};

export function getInterview (state, interview) {
  const interviewers = {...state.interviewers};
  const schedule = {...interview};
  return (!schedule.interviewer) ? null : {
    student: schedule.student,
    interviewer: (schedule.interviewer===null ? null : interviewers[schedule.interviewer])
  }
}

export function getInterviewersForDay (state, day) {
  const days = [...state.days]; 
  const interviewers = {...state.interviewers};
  // filter the days array to find the day
  const dayInterviewers = days.filter(appointment => appointment.name === day);
  if (dayInterviewers.length === 0) { // if the day is not found
    return [];
  }
  // filter the interviewers object to find the interviewers for the day
  const interviewersArray = dayInterviewers[0].interviewers;
  if (interviewersArray === undefined) { // if the day has no interviewers
    return [];
  }
  const result = [];
  for(let element of interviewersArray) {
    if (interviewers[element] !== undefined) {
      result.push(interviewers[element]);
    }
  }
  return result;
}


