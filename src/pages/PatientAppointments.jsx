import { Link } from "react-router-dom";

export default function PatientAppointments() {
  const appointments = JSON.parse(
    localStorage.getItem("routerAppointments") || "[]"
  );

  return (
    <div>
      <h3>All Appointments</h3>

      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        appointments.map((a) => (
          <div className="card" key={a.id}>
            <p>Doctor: {a.doctor}</p>
            <p>Date: {a.date}</p>
            <p>Time: {a.time}</p>
            <p>Patient: {a.name}</p>
          </div>
        ))
      )}

      <Link to="/doctors">Book another appointment</Link>
    </div>
  );
}