
export default function AppointmentCard({ appointment }) {
  return (
    <article className="appointment-card">
      <h3>{appointment.doctorName}</h3>
      <p>Speciality: {appointment.specialty}</p>
      <p>Date: {appointment.date}</p>
      <p>Time: {appointment.time}</p>
      <p>Patient: {appointment.patientName}</p>
      <p>Status: {appointment.status}</p>
      <strong>Fee: ₹{appointment.fee}</strong>
    </article>
  );
}
