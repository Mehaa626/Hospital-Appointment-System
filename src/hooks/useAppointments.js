import {
  useState,
  useEffect,
  useMemo,
  useCallback
} from "react";

export default function useAppointments() {
  const [appointments, setAppointments] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("careAppointments")) || [];
    } catch {
      return [];
    }
  });

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [reminder, setReminder] = useState("");

  useEffect(() => {
    localStorage.setItem(
      "careAppointments",
      JSON.stringify(appointments)
    );
  }, [appointments]);

  const availableTimeSlots = useMemo(() => {
    if (!selectedDoctor || !selectedDate || !selectedDoctor.available) {
      return [];
    }

    const allSlots = [
      "09:00 AM",
      "10:00 AM",
      "11:00 AM",
      "02:00 PM",
      "03:00 PM"
    ];

    const bookedSlots = appointments
      .filter(
        (a) =>
          a.doctorId === selectedDoctor.id &&
          a.date === selectedDate &&
          a.status === "Booked"
      )
      .map((a) => a.time);

    return allSlots.filter((slot) => !bookedSlots.includes(slot));
  }, [appointments, selectedDoctor, selectedDate]);

  const upcomingAppointments = useMemo(() => {
    const today = new Date().toLocaleDateString("en-CA");

    return appointments.filter(
      (a) => a.status === "Booked" && a.date >= today
    );
  }, [appointments]);

  const appointmentHistory = useMemo(
    () => appointments,
    [appointments]
  );

  const appointmentCount = useMemo(
    () => appointments.filter((a) => a.status === "Booked").length,
    [appointments]
  );

  const selectTimeSlot = useCallback((time) => {
    setSelectedTime(time);
  }, []);

  const bookAppointment = useCallback(
    (patientName) => {
      if (
        !selectedDoctor ||
        !patientName.trim() ||
        !selectedDate ||
        !selectedTime
      ) {
        return false;
      }

      const newAppointment = {
        id: Date.now(),
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        specialty: selectedDoctor.specialty,
        patientName: patientName.trim(),
        date: selectedDate,
        time: selectedTime,
        fee: selectedDoctor.fee,
        status: "Booked"
      };

      setAppointments((previous) => [...previous, newAppointment]);
      setReminder(
        `Reminder: Appointment with ${selectedDoctor.name} on ${selectedDate} at ${selectedTime}.`
      );
      setSelectedTime("");
      return true;
    },
    [selectedDoctor, selectedDate, selectedTime]
  );

  const cancelAppointment = useCallback((id) => {
    setAppointments((previous) =>
      previous.map((a) =>
        a.id === id ? { ...a, status: "Cancelled" } : a
      )
    );
    setReminder("Appointment cancelled.");
  }, []);

  const rescheduleAppointment = useCallback((id, date, time) => {
    if (!date || !time) return false;

    setAppointments((previous) =>
      previous.map((a) =>
        a.id === id && a.status === "Booked"
          ? { ...a, date, time }
          : a
      )
    );

    setReminder("Appointment rescheduled successfully.");
    return true;
  }, []);

  const clearAppointment = useCallback(() => {
    setSelectedDoctor(null);
    setSelectedDate("");
    setSelectedTime("");
  }, []);

  return {
    appointments,
    selectedDoctor,
    setSelectedDoctor,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    availableTimeSlots,
    upcomingAppointments,
    appointmentHistory,
    appointmentCount,
    reminder,
    setReminder,
    selectTimeSlot,
    bookAppointment,
    cancelAppointment,
    rescheduleAppointment,
    clearAppointment
  };
}