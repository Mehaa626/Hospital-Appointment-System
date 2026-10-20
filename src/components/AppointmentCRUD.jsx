
import { useEffect, useState } from "react";
import {
  getDoctors,
  getAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment
} from "../services/api";

export default function AppointmentCRUD() {
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [patient, setPatient] = useState("");
  const [doctorId, setDoctorId] = useState("101");
  const [date, setDate] = useState("2027-11-15");
  const [time, setTime] = useState("09:00 AM");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  async function loadData() {
    setLoading(true);
    setError("");

    try {
      const [doctorData, appointmentData] = await Promise.all([
        getDoctors(),
        getAppointments()
      ]);

      setDoctors(doctorData);
      setAppointments(appointmentData);

      if (doctorData.length > 0 &&
          !doctorData.some((d) => d.id === doctorId)) {
        setDoctorId(doctorData[0].id);
      }
    } catch {
      setError("Unable to load data. Check whether JSON Server is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleBook(e) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!patient.trim() || !date || !time || !doctorId) {
      setError("Please fill in all fields.");
      return;
    }

    const doctor = doctors.find((d) => d.id === doctorId);

    setLoading(true);
    try {
      await createAppointment({
        patient: patient.trim(),
        doctorId,
        doctorName: doctor?.name || "Doctor",
        date,
        time,
        status: "Booked"
      });

      setPatient("");
      setMessage("Appointment booked successfully!");
      await loadData();
    } catch {
      setError("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReschedule(appointment) {
    const newDate = window.prompt(
      "Enter new date (YYYY-MM-DD):",
      appointment.date
    );

    if (!newDate) return;

    const newTime = window.prompt(
      "Enter new time slot:",
      appointment.time
    );

    if (!newTime) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await updateAppointment(appointment.id, {
        date: newDate,
        time: newTime,
        status: "Rescheduled"
      });

      setMessage("Appointment rescheduled successfully!");
      await loadData();
    } catch {
      setError("Unable to reschedule appointment.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCancel(id) {
    if (!window.confirm("Cancel this appointment?")) return;

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await deleteAppointment(id);
      setMessage("Appointment cancelled successfully!");
      await loadData();
    } catch {
      setError("Unable to cancel appointment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="crud-container">
      <h1>CareNest Appointment Management</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {message && <p className="success">{message}</p>}

      <form onSubmit={handleBook}>
        <h2>Book Appointment</h2>

        <label>Patient Name</label>
        <input
          value={patient}
          onChange={(e) => setPatient(e.target.value)}
          placeholder="Enter patient name"
          required
        />

        <label>Select Doctor</label>
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
        >
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name} - {doctor.specialty}
            </option>
          ))}
        </select>

        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
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

        <button type="submit" disabled={loading}>
          Book Appointment
        </button>
      </form>

      <h2>Appointment History</h2>

      {appointments.length === 0 && !loading && (
        <p>No appointments found.</p>
      )}

      {appointments.map((appointment) => (
        <div className="appointment-card" key={appointment.id}>
          <p><b>Patient:</b> {appointment.patient}</p>
          <p><b>Doctor:</b> {appointment.doctorName}</p>
          <p><b>Date:</b> {appointment.date}</p>
          <p><b>Time:</b> {appointment.time}</p>
          <p><b>Status:</b> {appointment.status}</p>

          <button
            disabled={loading}
            onClick={() => handleReschedule(appointment)}
          >
            Reschedule
          </button>

          <button
            disabled={loading}
            onClick={() => handleCancel(appointment.id)}
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}
