import React, {Fragment, useState } from "react";
import useAxios from "./useAxios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  
  const {state, setDay, setAppointments, updateAxios, saveStatus, error} = useAxios(); // data from the server
  console.log("Application/databaseErrorReturn",error); // future error handling

  const bookInterview = async (id, interview) => {
    const appointment = { // appointment object to be sent to the server
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("Application/bookInterview/inputToBook",appointment.id,appointment.interview);

    return await updateAxios(appointment.id, appointment.interview)
      .then((res) => {
       setAppointments(appointments);
       return true;
      })
      .catch(error => {
        console.log("Application/bookInterview/error",error);
      }
      );
   
        
  }

  const cancelInterview = (id) => {
    const deleteAppointment = {
      ...state.appointments[id],
      interview: {student: "", interviewer: null}
    };
    console.log("Application/CancelInterview/deletingAppointmentInput",deleteAppointment.id,deleteAppointment.interview);

    updateAxios(deleteAppointment.id, deleteAppointment.interview); // send the new appointment to the server
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
        save={saveStatus}
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
