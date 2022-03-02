import React, {Fragment, useState } from "react";
import useAxios from "./useAxios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  
  const {state, setDay, setAppointments, updateAxios, saveStatus, error} = useAxios(); // data from the server
  console.log("Application/databaseErrorReturn",error); // future error handling

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

    // const data = await 
    updateAxios(appointment.id, appointment.interview, callback, "BOOKING");
    // console.log("data",data);
    // if (data===undefined) {
    //   callback("SHOW");
    // } else {
    //   callback("ERROR_SAVE", true);
    //   console.log("schedule");
    // }
    // return data;
 

            
  }

  // const bookInterview = async (id, interview) => {
  //   const appointment = { // appointment object to be sent to the server
  //     ...state.appointments[id],
  //     interview: { ...interview }
  //   };
  //   const appointments = {
  //     ...state.appointments,
  //     [id]: appointment
  //   };
  //   console.log("Application/bookInterview/inputToBook",appointment.id,appointment.interview);

  //   updateAxios(appointment.id, appointment.interview);
  //   console.log("done1");
  //   setAppointments(appointments); 
  //   console.log("done2");
            
  // }

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

  //   const data = await 
    updateAxios(deleteAppointment.id, deleteAppointment.interview, callback, "DELETING");
  //   console.log("data",data);
  //   if (data===undefined) {
  //     callback("EMPTY");
  //   } else {
  //     callback("ERROR_DELETE", true);
  //   }
  //   console.log("schedule");
  //   return data;
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
