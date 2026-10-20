import { useAppointmentContext } from "../context/AppointmentContext";

export default function PatientProfile() {
  const {
    appointments,
    appointmentCount,
    upcomingAppointments
  } = useAppointmentContext();

  return (
    <section id="patient">
      <h2>Patient Profile</h2>
      <p>Total appointments booked: {appointmentCount}</p>

      <h3>Upcoming Appointments</h3>

      {upcomingAppointments.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        upcomingAppointments.map((appointment) => (
          <div className="card" key={appointment.id}>
            <p>{appointment.patientName}</p>
            <p>{appointment.doctorName}</p>
            <p>{appointment.date} - {appointment.time}</p>
          </div>
        ))
      )}

      <p>Total appointment records: {appointments.length}</p>
    </section>
  );
}