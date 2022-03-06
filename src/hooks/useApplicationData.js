import useAxios from "../components/useAxios";

const useApplicationData = () => {

  const {state, setDay, setDays, setAppointments, updateAxios} = useAxios(); // data from the server


  const setSpot = (refDays, refAppointments, refDay) => { // count and set the spots of the day
    const days = [...refDays];
    const appointments = {...refAppointments};
    const currentDay = refDay;
    const newSpots = [];

    let totalNull = 0;
    for (let element of days) {
      if (element.name === currentDay) {
         for (let appoint of element.appointments){
          if (appointments[appoint].interview === null) {
             totalNull++;
          } else if(appointments[appoint].interview.interviewer === null){
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
    // direct database update request     
    updateAxios(appointment.id, appointment.interview, callback, "BOOKING",()=>setAppointments(appointments),()=>setSpot(state.days, appointments, state.day));
    
  }
  
  // cancels an interview and setting the next "transition" in the stack
  const cancelInterview = async (_id, callback, mode) => {
    const deleteAppointment = { // preparing the new appointment to be sent to the server
      ...state.appointments[_id],
      interview: {student: "", interviewer: null}
    };
    const deleteAppointments = { // preparing the new appointment to be set in memory
      ...state.appointments,
      [_id]: deleteAppointment
    };
    // direct database update request     
    updateAxios(deleteAppointment.id, deleteAppointment.interview, callback, mode,()=>setAppointments(deleteAppointments),()=>setSpot(state.days, deleteAppointments, state.day));
    
  }

  return { bookInterview, cancelInterview, state, setDay };

};

export default useApplicationData;