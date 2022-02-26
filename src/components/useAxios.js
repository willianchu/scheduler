import {useState, useEffect} from "react";
import axios from "axios";

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
        name: "Willian Chu",
        avatar: "images/admin.jpg",
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

const useAxios = () => {
  const [error, setError] = useState(null);
  const [state, setState] = useState({ // set default state
    day: "Monday",
    days: [],
    appointments: defaultAppointments,
    interviewers: []
    });
  const setDay = day => setState( prev => ({...prev, day }));
  const setAllData = (days, appointments, interviewers) => setState(prev => ({ ...prev, days, appointments, interviewers }));

  useEffect(() => {
    const first_endpoint = "http://localhost:8001/api/days";
    const second_endpoint = "http://localhost:8001/api/appointments";
    const third_endpoint = "http://localhost:8001/api/interviewers";
      Promise.all([
        axios.get(first_endpoint), // get_days
        axios.get(second_endpoint), // get_appointments
        axios.get(third_endpoint) // get_interviewers
      ])
      .then((all) => {
        setError(null);
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        setAllData([...days], {...appointments}, {...interviewers});
      })
      .catch(err => {
        setError(err.message);
      });
    },[]);
    return {state, setDay, error};
  };

export default useAxios;