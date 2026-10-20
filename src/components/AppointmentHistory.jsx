import { useAppointmentContext } from "../context/AppointmentContext";

export default function AppointmentHistory() {
  const {
    appointmentHistory,
    cancelAppointment,
    rescheduleAppointment,
    reminder,
    setReminder
  } = useAppointmentContext();

  function handleReschedule(appointment) {
    const date = prompt("Enter new date (YYYY-MM-DD):");
    if (!date) return;

    const time = prompt(
      "Enter new time (example: 10:00 AM):"
    );
    if (!time) return;

    if (date < new Date().toLocaleDateString("en-CA")) {
      alert("Please select today or a future date.");
      return;
    }

    const success = rescheduleAppointment(
      appointment.id,
      date,
      time
    );

    if (success) alert("Appointment rescheduled!");
  }

  return (
    <section id="history">
      <h2>Appointment History</h2>

      {appointmentHistory.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        appointmentHistory.map((appointment) => (
          <div className="card" key={appointment.id}>
            <h3>{appointment.doctorName}</h3>
            <p>Patient: {appointment.patientName}</p>
            <p>Date: {appointment.date}</p>
            <p>Time: {appointment.time}</p>
            <p>Status: {appointment.status}</p>

            {appointment.status === "Booked" && (
              <>
                <button
                  onClick={() => handleReschedule(appointment)}
                >
                  Reschedule
                </button>

                <button
                  onClick={() => {
                    cancelAppointment(appointment.id);
                  }}
                >
                  Cancel
                </button>
              </>
            )}

            {appointment.status === "Cancelled" && (
              <p>Appointment cancelled.</p>
            )}
          </div>
        ))
      )}

      {reminder && (
        <p className="message">
          {reminder}
          <button onClick={() => setReminder("")}>OK</button>
        </p>
      )}
    </section>
  );
}