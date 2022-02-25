import React, {Fragment, useState, useEffect} from "react";
import axios from "axios";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";

const appointments = [
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


export default function Application(props) {

useEffect(() => {
  axios.get('http://localhost:8001/api/days').then(response => {
    console.log(response);
    setDays([...response.data])
  });
});

  const [days, setDays] = useState(mockDays);
  
  const [day, setDay] = useState("Monday");

  const allAppointments = appointments.map((appointment) => {
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
                  days={days}
                  // day={day}
                  value={day}
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
