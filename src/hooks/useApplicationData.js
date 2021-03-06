import useAxios from "./useAxios";

const useApplicationData = () => {
  const {state, setDay, setDays, setAppointments, updateAxios, dataLoaded, setDataLoaded} = useAxios();
  const setSpot = (_days, _appointments, _day) => {
  const days = [..._days];
  const appointments = {..._appointments};
  const currentDay = _day;
  const newSpots = [];
  let totalNull = 0;
  for (let element of days) {
    if (element.name === currentDay) {
      for (let appoint of element.appointments){
        if (appointments[appoint].interview === null || appointments[appoint].interview.interviewer === null){ // if the appointment is empty or cancelled
          totalNull++;
        }
      }
      element.spots = totalNull;
      totalNull = 0;
    } 
    newSpots.push(element);
  }
  setDays(newSpots);
  };

  // books an interview and setting the next "transition" in the stack
  const bookInterview = (_id, _interview, callback) => {
    const appointment = {  // preparing the new appointment to be sent to the server
      ...state.appointments[_id],
      interview: { ..._interview }
    };
    const appointments = { // preparing the new appointment to be set in memory
      ...state.appointments,
      [_id]: appointment
    };
    updateAxios(appointment.id, appointment.interview, callback, "BOOKING",()=>setAppointments(appointments),()=>setSpot(state.days, appointments, state.day));
  }
  
  const cancelInterview = (_id, callback, mode) => {
    const deleteAppointment = { 
      ...state.appointments[_id],
      interview: {student: "", interviewer: null}
    };
    const deleteAppointments = { 
      ...state.appointments,
      [_id]: deleteAppointment
    };
    updateAxios(deleteAppointment.id, deleteAppointment.interview, callback, mode,()=>setAppointments(deleteAppointments),()=>setSpot(state.days, deleteAppointments, state.day));
  }

  const updateSpotsFirstTime = (refDays, refAppointments) => { //it's a calculate field
    const days = [...refDays]; // do once [] case a refresh browser 
    const appointments = {...refAppointments};
    const newSpots = [];
    let totalNull = 0;
    for (let element of days) {
      for (let appoint of element.appointments){
        if (appointments[appoint].interview === null) {
          totalNull++;
        } else if(appointments[appoint].interview.interviewer === null){
          totalNull++;
        }
      }
      element.spots = totalNull;
      totalNull = 0;
      newSpots.push(element);
    }
    setDays(newSpots);
    setDataLoaded(false)
    return newSpots;
  };
  return { bookInterview, cancelInterview, state, setDay, dataLoaded, updateSpotsFirstTime };
};

export default useApplicationData;