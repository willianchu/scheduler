import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    if (replace) {
      setHistory(prevHistory => [...prevHistory.slice(0,-1), newMode]); // replace the last element
    } else {
      setHistory(prevHistory => [...prevHistory, newMode]);
    }
    
    setMode(newMode);
  }

  function back() {
    
    if (history.length >= 1) {
      const prevHistory = history;
      setHistory(prevHistory.slice(0, -1));
      setMode(prevHistory[prevHistory.length - 2]); // this is still the old history before de slice that's why -2
     
    }
  }

  return { mode, transition, back, history };
}
