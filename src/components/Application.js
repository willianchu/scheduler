import React, {Fragment, useState, useEffect} from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay } from "helpers/selectors";
export default function Application(props) {

const defaultAppointments = [
    {
      id: 1,
      time: "12pm",
    },
    {
      id: 2,
      time: "1pm",
      interview: {
        student: "Lydia Miller-Jones",
        interviewer:{
          id: 3,
          name: "Sylvia Palmer",
          avatar: "https://i.imgur.com/LpaY82x.png",
        }
      }
    },
    {
      id: 3,
      time: "2pm",
    },
    {
      id: 4,
      time: "3pm",
      interview: {
        student: "Archie Andrews",
        interviewer:{
          id: 4,
          name: "Cohana Roy",
          avatar: "https://i.imgur.com/FK8V841.jpg",
        }
      }
    },
    {
      id: 5,
      time: "4pm",
    },
    {
      id: 6,
      time: "5pm"
    }
  ];


useEffect(() => {
  const first_endpoint = "http://localhost:8001/api/days";
  const second_endpoint = "http://localhost:8001/api/appointments";
  const third_endpoint = "http://localhost:8001/api/interviewers";

    Promise.all([
      axios.get(first_endpoint), // get_days
      axios.get(second_endpoint), // get_appointments
      axios.get(third_endpoint) // get_interviewers
    ]).then((all) => {
      console.log(all[0]); // first
      console.log(all[1]); // second
      console.log(all[2]); // third
      const days = all[0].data;
      const appointments = all[1].data;
      const interviewers = all[2].data;
      setAllData([...days], {...appointments}, {...interviewers});
    });
      
},[]);

// const [days, setDays] = useState([]);
// const [day, setDay] = useState("Monday");
// const [appointments, setAppointments] = useState([]);
// A big combined useState hook is the following:
const [state, setState] = useState({
  day: "Monday",
  days: [],
  appointments: defaultAppointments,
  interviewers: []
});
const dailyAppointments = getAppointmentsForDay(state, state.day);
const setDay = day => setState( prev => ({...prev, day }));
// const setDays = days => setState(prev => ({ ...prev, days })); it comes a new one
// const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));
const setAllData = (days, appointments, interviewers) => setState(prev => ({ ...prev, days, appointments, interviewers }));


  const allAppointments = dailyAppointments.map((appointment) => {
    return (
      <Appointment
        key={appointment.id}
        {...appointment}
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
        {allAppointments}
      </section>
    </main>
  );
}
