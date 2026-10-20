
import { useState } from "react";

export default function AppointmentsPage() {
  const [doctor, setDoctor] = useState("Dr. Priya Sharma");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00 AM");
  const [message, setMessage] = useState("");

  function handleBooking(e) {
    e.preventDefault();

    if (!date) {
      setMessage("Please select an appointment date.");
      return;
    }

    setMessage(
      `Appointment booked with ${doctor} on ${date} at ${time}.`
    );
  }

  return (
    <section>
      <h2>Book Appointment</h2>

      <form onSubmit={handleBooking}>
        <label htmlFor="doctor">Select Doctor</label>
        <select
          id="doctor"
          value={doctor}
          onChange={(e) => setDoctor(e.target.value)}
        >
          <option>Dr. Priya Sharma</option>
          <option>Dr. Arun Kumar</option>
          <option>Dr. Meena Raj</option>
        </select>

        <br /><br />

        <label htmlFor="date">Appointment Date</label>
        <input
          id="date"
          type="date"
          min={new Date().toISOString().split("T")[0]}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <br /><br />

        <label htmlFor="time">Select Time</label>
        <select
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        >
          <option>09:00 AM</option>
          <option>10:00 AM</option>
          <option>11:00 AM</option>
          <option>02:00 PM</option>
          <option>03:00 PM</option>
        </select>

        <br /><br />

        <button type="submit">Confirm Appointment</button>
      </form>

      {message && <p role="status">{message}</p>}
    </section>
  );
}
