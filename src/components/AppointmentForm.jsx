
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadDoctors } from "../store/doctorSlice";
import {
  bookAppointment,
  rescheduleAppointment,
  cancelAppointment
} from "../store/appointmentSlice";

export default function AppointmentForm() {
  const dispatch = useDispatch();

  const { doctors, status, error } = useSelector(
    (state) => state.doctors
  );

  const appointments = useSelector(
    (state) => state.appointments.appointments
  );

  const [doctorId, setDoctorId] = useState("101");
  const [date, setDate] = useState("2027-11-15");
  const [time, setTime] = useState("09:00 AM");
  const [patient, setPatient] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    dispatch(loadDoctors());
  }, [dispatch]);

  const selectedDoctor = doctors.find(
    (doctor) => doctor.id === doctorId
  );

  function book() {
    if (!patient.trim() || !date || !time) {
      setMessage("Please fill in all details.");
      return;
    }

    dispatch(bookAppointment({
      doctorId,
      doctorName: selectedDoctor?.name || "",
      date,
      time,
      patient
    }));

    setMessage("Appointment booked successfully!");
  }

  return (
    <div className="appointment-container">
      <h1>CareNest Appointment Management</h1>

      {status === "loading" && <p>Loading doctors...</p>}
      {status === "failed" && <p>Error: {error}</p>}

      {status === "succeeded" && (
        <>
          <label>Doctor</label>
          <select
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
          >
            {doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialty}
              </option>
            ))}
          </select>

          <label>Patient Name</label>
          <input
            value={patient}
            onChange={(e) => setPatient(e.target.value)}
            placeholder="Enter patient name"
          />

          <label>Appointment Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label>Time Slot</label>
          <select
            value={time}
            onChange={(e) => setTime(e.target.value)}
          >
            <option>09:00 AM</option>
            <option>10:00 AM</option>
            <option>11:30 AM</option>
            <option>02:00 PM</option>
            <option>03:00 PM</option>
          </select>

          <button onClick={book}>Book Appointment</button>
        </>
      )}

      {message && <p>{message}</p>}

      <h2>Appointments</h2>

      {appointments.length === 0 && <p>No appointments yet.</p>}

      {appointments.map((a) => (
        <div className="appointment-card" key={a.id}>
          <p><b>Patient:</b> {a.patient}</p>
          <p><b>Doctor:</b> {a.doctorName}</p>
          <p><b>Date:</b> {a.date}</p>
          <p><b>Time:</b> {a.time}</p>
          <p><b>Status:</b> {a.status}</p>

          {a.status !== "Cancelled" && (
            <>
              <button onClick={() => {
                const newDate = window.prompt(
                  "Enter new date (YYYY-MM-DD):",
                  a.date
                );
                if (!newDate) return;

                const newTime = window.prompt(
                  "Enter new time:",
                  a.time
                );
                if (!newTime) return;

                dispatch(rescheduleAppointment({
                  id: a.id,
                  date: newDate,
                  time: newTime
                }));
              }}>
                Reschedule
              </button>

              <button onClick={() => {
                dispatch(cancelAppointment(a.id));
              }}>
                Cancel
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

