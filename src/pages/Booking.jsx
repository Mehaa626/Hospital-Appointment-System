
import { useState } from "react";

const availabilityData = {
  101: {
    name: "Dr. Priya Sharma",
    date: "2027-11-15",
    slots: ["09:00 AM", "10:00 AM", "02:00 PM"]
  },
  102: {
    name: "Dr. Arun Kumar",
    date: "2027-11-15",
    slots: ["10:00 AM", "11:30 AM", "03:00 PM"]
  },
  103: {
    name: "Dr. Meena Raj",
    date: "2027-11-16",
    slots: ["09:30 AM", "01:00 PM", "04:00 PM"]
  }
};

export default function Booking() {
  const [selectedSlot, setSelectedSlot] = useState("");
  const [message, setMessage] = useState("");

  const doctorId = window.location.pathname.split("/").pop();
  const doctor = availabilityData[doctorId];

  function bookAppointment() {
    if (!selectedSlot) {
      setMessage("Please select an appointment time.");
      return;
    }

    setMessage(
      `Appointment selected with ${doctor.name} on ${doctor.date} at ${selectedSlot}.`
    );
  }

  if (!doctor) {
    return <h2>Doctor availability not found.</h2>;
  }

  return (
    <div style={{
      padding: "30px",
      background: "#f0faf4",
      minHeight: "80vh"
    }}>
      <h1>Appointment Availability</h1>

      <h2>{doctor.name}</h2>
      <p>Available Date: {doctor.date}</p>

      <h3>Select a Time Slot</h3>

      {doctor.slots.map((slot) => (
        <button
          key={slot}
          onClick={() => setSelectedSlot(slot)}
          style={{
            padding: "12px",
            margin: "8px",
            borderRadius: "8px",
            border: "1px solid #138568",
            background: selectedSlot === slot ? "#138568" : "white",
            color: selectedSlot === slot ? "white" : "#174b3d",
            cursor: "pointer"
          }}
        >
          {slot}
        </button>
      ))}

      <br />

      <button
        onClick={bookAppointment}
        style={{
          marginTop: "20px",
          padding: "12px 20px",
          background: "#138568",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer"
        }}
      >
        Book Appointment
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}
