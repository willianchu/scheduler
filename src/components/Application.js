import React, {Fragment} from "react";
import useAxios from "./useAxios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const {state, setDay, updateAxios, error} = useAxios(); // data from the server
  console.log("database",error); // future error handling

  const bookInterview = (id, interview) => {
    const appointment = { // appointment object to be sent to the server
      ...state.appointments[id],
      interview: { ...interview }
    };
    console.log("booked",appointment.id,appointment.interview);
    updateAxios(appointment.id, appointment.interview);
    
    // send the new appointment to the server
    const appointments = { // all appointments with the new appointment
      ...state.appointments,
      [id]: appointment
    };
   
  }

  const save = (name, interviewer, id) => {
    const interview = {
      student: name,
      interviewer,
    }; 
    console.log("save",interview.student,interview.interviewer,id);
    bookInterview(id,interview);
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    console.log("deleting appointment",appointment.id,appointment.interview);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    updateAxios(appointment.id, null); // send the new appointment to the server
  }

  const dailyAppointments = getAppointmentsForDay(state, state.day); 

  const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const todaysInterviewers = getInterviewersForDay (state, state.day);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={todaysInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
        save={save}
      />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
        {
          <Fragment>
            <img
              className="sidebar--centered"
              src="images/logo.png"
              alt="Interview Scheduler"
            />
            <hr
             className="sidebar__separator sidebar--centered"
            />
            <nav 
              className="sidebar__menu">
                <DayList
                  days={state.days}
                  // day={day}
                  value={state.day}
                  // setDay={setDay}
                  onChange={setDay}
                />
            </nav>
            <img
              className="sidebar__lhl sidebar--centered"
              src="images/lhl.png"
              alt="Lighthouse Labs"
            />
            </Fragment>
          }
      </section>
      <section className="schedule">
        {schedule}
      </section>
    </main>
  );
}
