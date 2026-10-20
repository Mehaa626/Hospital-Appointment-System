import { createContext, useContext } from "react";
import useDoctors from "../hooks/useDoctors";
import useAppointments from "../hooks/useAppointments";

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const doctorData = useDoctors();
  const appointmentData = useAppointments();

  return (
    <AppointmentContext.Provider
      value={{ ...doctorData, ...appointmentData }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointmentContext() {
  return useContext(AppointmentContext);
}