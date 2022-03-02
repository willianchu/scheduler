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
  const [saveStatus, setSaveStatus] = useState("saved");
  const [error, setError] = useState(null);
  const [state, setState] = useState({ // set default state
    day: "Monday",
    days: [],
    appointments: defaultAppointments,
    interviewers: []
    });


  const setDay = day => setState( prev => ({...prev, day }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));
  const setAllData = (days, appointments, interviewers) => setState(prev => ({ ...prev, days, appointments, interviewers }));

  const first_endpoint = "/api/days";
  const second_endpoint = "/api/appointments";
  const third_endpoint = "/api/interviewers";
  
  useEffect(() => {
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

    function updateAxios(id, data, callback, mode) {
      let status1 = "";
      let status2 = "";
      const post_endpoint = "/api/appointments/" + id;
      const interview = {...data}; // copy data
      console.log("useAxios/updateAxios/postingData",id,{interview});
      if (mode === "DELETING") {
        status1 = "EMPTY";
        status2 = "ERROR_DELETE";
      }
      if (mode === "BOOKING") {
        status1 = "SHOW";
        status2 = "ERROR_SAVE";
      }
        
      
      axios
        .put(post_endpoint, {interview})
        .then((res) => {
          // res.status(204).json({});
          console.log("useAxios/Server",{res});
          setError(null);
          callback(status1);
          return res.body; 
        })
        .catch(err => {
          callback(status2, true);
          setError(err.message);
          return err;
        });
        
    }

    return {state, setDay, setAppointments, updateAxios, saveStatus, error};
  };

export default useAxios;

