
import { Link, useLocation, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import AppointmentCard from "../components/AppointmentCard.jsx";

export function Confirmation() {
  const { id } = useParams();
  const location = useLocation();
  const { user } = useAuth();

  let bookings = [];
  try {
    bookings = JSON.parse(localStorage.getItem("careBookings") || "[]");
  } catch {
    bookings = [];
  }

  const appointment =
    location.state?.appointment || bookings.find(a => a.id === id);

  if (!appointment || appointment.patientId !== user.patientId) {
    return (
      <main className="page panel">
        <h1>Appointment not found</h1>
        <Link to="/appointments">View appointment history</Link>
      </main>
    );
  }

  return (
    <main className="page">
      <section className="panel confirmation">
        <h1>✓ Booking Confirmed!</h1>
        <p>Your appointment has been booked successfully.</p>
        <p>Booking ID: {appointment.id}</p>

        <AppointmentCard appointment={appointment} />

        <Link className="btn" to="/appointments">
          View Appointment History
        </Link>
      </section>
    </main>
  );
}

export default function Appointments() {
  const { user } = useAuth();

  let bookings = [];
  try {
    bookings = JSON.parse(localStorage.getItem("careBookings") || "[]");
  } catch {
    bookings = [];
  }

  const mine = bookings.filter(
    a => a.patientId === user.patientId
  ).reverse();

  return (
    <main className="page">
      <h1>Appointment History</h1>

      {mine.length === 0 ? (
        <section className="panel">
          <p>No appointments booked yet.</p>
          <Link className="btn" to="/doctors">Find a Doctor</Link>
        </section>
      ) : (
        <div className="appointment-list">
          {mine.map(appointment => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
            />
          ))}
        </div>
      )}
    </main>
  );
}

