import "components/Application.scss";
import React, {Fragment } from "react";
import DayList from "./DayList";
import Appointment from "./Appointment";
import useApplicationData from "hooks/useApplicationData";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {

  const { bookInterview, cancelInterview, state, setDay, dataLoaded, updateSpotsFirstTime } = useApplicationData(); 

  if (state.appointments[1]===undefined) {
    console.log("loading..."); // prevent the page from loading before the data is loaded
    return <p>Loading data from the server...</p>
  
  } else {
    const dailyAppointments = getAppointmentsForDay(state, state.day); 
    const schedule = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const todaysInterviewers = getInterviewersForDay (state, state.day);
    if (dataLoaded) {
      updateSpotsFirstTime(state.days, state.appointments);
    }
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={todaysInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
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
}
