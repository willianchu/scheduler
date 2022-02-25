export function getAppointmentsForDay (state, day) {
  const days = [...state.days]; // copy the array
  const appointments = {...state.appointments}; // copy the object
  // filter the days array to find the day
  const dayAppointments = days.filter(appointment => appointment.name === day);
  if (dayAppointments.length === 0) { // if the day is not found
    return [];
  }
  // filter the appointments object to find the appointments for the day
  const appointmentsArray = dayAppointments[0].appointments;
  if (appointmentsArray.length === 0) { // if the day has no appointments
    return [];
  }
  const result = appointmentsArray.map(appointment => appointments[appointment]);
  return result;
}
