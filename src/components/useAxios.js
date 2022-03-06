import {useState, useEffect} from "react";
import axios from "axios";

const useAxios = () => {
  const [error, setError] = useState(null);
  const [state, setState] = useState({ // set default state
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
    });

  const setDay = day => setState( prev => ({...prev, day }));
  const setDays = days => setState( prev => ({...prev, days }));
  const setAppointments = appointments => setState(prev => ({ ...prev, appointments }));
  const setAllData = (days, appointments, interviewers) => setState(prev => ({ ...prev, days, appointments, interviewers }));

  const endpointDays = "/api/days";
  const endpointAppointments = "/api/appointments";
  const endpointInterviewers = "/api/interviewers";
  
  useEffect(() => {
      Promise.all([
        axios.get(endpointDays), // get_days
        axios.get(endpointAppointments), // get_appointments
        axios.get(endpointInterviewers) // get_interviewers
      ])
      .then((all) => {
        setError(null);
        const days = all[0].data;
        const appointments = all[1].data;
        const interviewers = all[2].data;
        updateSpotsFirstTime(days, appointments);
        setAllData([...days], {...appointments}, {...interviewers});
      })
      .catch(err => {
        setError(err.message);
      });
    },[]);

    function updateAxios(id, data, setStackMode, currentMode, updateMemoryData, updateMemorySpots) {
      let modeIfSuccess = "";
      let modeIfFail = "";
      
      const endpointPost = "/api/appointments/" + id;
      const interview = {...data}; // copy data
      console.log("useAxios/updateAxios/postingData",id,{interview});
      if (currentMode === "DELETING") {
        modeIfSuccess = "EMPTY";
        modeIfFail = "ERROR_DELETE";
      }
      if (currentMode === "BOOKING") {
        modeIfSuccess = "SHOW";
        modeIfFail = "ERROR_SAVE";
      }
      if (currentMode === "SAVING") {
        modeIfSuccess = "SHOW";
        modeIfFail = "ERROR_SAVE";
      }
        
      
      axios
        .put(endpointPost, {interview}) // update permanently in server
        .then((res) => {
          // res.status(204).json({});
          updateMemoryData(); // if success, update memory data
          updateMemorySpots();  // if success, update memory spots
          setError(null);
          setStackMode(modeIfSuccess, true); // update new mode in stack replacing 
          
          return res.body; 
        })
        .catch(err => {
          setStackMode(modeIfFail, true); // update new mode in stack replacing 

          setError(err.message);
          return err;
        });
        
    }

    const updateSpotsFirstTime = (refDays, refAppointments) => { //it's a calculate field
      const days = [...refDays]; // do once [] case a refresh browser 
      const appointments = {...refAppointments}; //updated based on interviews
      const newSpots = [];
      let totalNull = 0;
      for (let element of days) {
        for (let appoint of element.appointments){
          if (appointments[appoint].interview === null) {
            totalNull++;
          } else if(appointments[appoint].interview.interviewer === null){
            totalNull++;
          }
        }
          element.spots = totalNull;
          totalNull = 0;
          newSpots.push(element);
      }
      setDays(newSpots);
      return newSpots;
    };

    return {state, setDay, setDays, setAppointments, updateAxios, error};
  };

export default useAxios;






