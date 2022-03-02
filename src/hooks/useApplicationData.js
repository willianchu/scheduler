import useAxios from "../components/useAxios";

const useApplicationData = () => {

  const {state, setDay, setAppointments, updateAxios} = useAxios(); // data from the server

  const bookInterview = async (id, interview,callback) => {
    const appointment = { // appointment object to be sent to the server
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("Application/bookInterview/inputToBook",appointment.id,appointment.interview);
    setAppointments(appointments); 
    console.log("done1");

    updateAxios(appointment.id, appointment.interview, callback, "BOOKING");
            
  }
  
  const cancelInterview = async (id, callback) => {
    const deleteAppointment = {
      ...state.appointments[id],
      interview: {student: "", interviewer: null}
    };
    const appointments = {
      ...state.appointments,
      [id]: deleteAppointment
    };
    console.log("Application/CancelInterview/deletingAppointmentInput",deleteAppointment.id,deleteAppointment.interview);

    setAppointments(appointments); 
    console.log("done1");
    updateAxios(deleteAppointment.id, deleteAppointment.interview, callback, "DELETING");
  }

  return { bookInterview, cancelInterview, state, setDay };

};

export default useApplicationData;