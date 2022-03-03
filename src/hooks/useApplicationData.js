import useAxios from "../components/useAxios";

const useApplicationData = () => {

  const {state, setDay, setDays, setAppointments, updateAxios} = useAxios(); // data from the server


  const setSpot = (refDays, refAppointments, refDay) => {
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

  const bookInterview = (_id, _interview, callback) => {
    const appointment = { // appointment object to be sent to the server
      ...state.appointments[_id],
      interview: { ..._interview }
    };
    const appointments = {
      ...state.appointments,
      [_id]: appointment
    };
    
    setAppointments(appointments); 
        
    setSpot(state.days, appointments, state.day); 
    
    updateAxios(appointment.id, appointment.interview, callback, "BOOKING");
    
  }
  
  const cancelInterview = async (_id, callback) => {
    const deleteAppointment = {
      ...state.appointments[_id],
      interview: {student: "", interviewer: null}
    };
    const deleteAppointments = {
      ...state.appointments,
      [_id]: deleteAppointment
    };
    setAppointments(deleteAppointments);
    setSpot(state.days, deleteAppointments, state.day);  
    
    updateAxios(deleteAppointment.id, deleteAppointment.interview, callback, "DELETING");
    
  }

  return { bookInterview, cancelInterview, state, setDay };

};

export default useApplicationData;