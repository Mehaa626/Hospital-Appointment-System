import { useState } from "react";
import { useAppointmentContext } from "../context/AppointmentContext";

export default function AppointmentBooking() {
  const [patientName, setPatientName] = useState("");

  const {
    selectedDoctor,
    selectedDate,
    setSelectedDate,
    selectedTime,
    availableTimeSlots,
    selectTimeSlot,
    bookAppointment,
    clearAppointment,
    reminder,
    setReminder
  } = useAppointmentContext();

  function handleBooking(e) {
    e.preventDefault();

    const success = bookAppointment(patientName);

    if (success) {
      setPatientName("");
      alert("Appointment booked successfully!");
    } else {
      alert("Please enter all details and select a time slot.");
    }
  }

  return (
    <section id="booking">
      <h2>Book Appointment</h2>

      {!selectedDoctor ? (
        <p>Please select an available doctor first.</p>
      ) : (
        <form onSubmit={handleBooking}>
          <p>Doctor: {selectedDoctor.name}</p>
          <p>Consultation Fee: ₹{selectedDoctor.fee}</p>

          <input
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            required
          />

          <input
            type="date"
            value={selectedDate}
            min={new Date().toLocaleDateString("en-CA")}
            onChange={(e) => {
              setSelectedDate(e.target.value);
              setReminder("");
            }}
            required
          />

          <h3>Available Time Slots</h3>

          {availableTimeSlots.length > 0 ? (
            <div className="slots">
              {availableTimeSlots.map((slot) => (
                <button
                  type="button"
                  key={slot}
                  className={selectedTime === slot ? "selected" : ""}
                  onClick={() => selectTimeSlot(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          ) : (
            <p>No time slots available.</p>
          )}

          <button type="submit" disabled={!selectedTime}>
            Confirm Booking
          </button>

          <button type="button" onClick={clearAppointment}>
            Clear
          </button>
        </form>
      )}

      {reminder && <p className="message">{reminder}</p>}
    </section>
  );
}