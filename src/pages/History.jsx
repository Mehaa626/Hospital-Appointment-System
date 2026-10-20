export default function History() {
  const appointments = JSON.parse(
    localStorage.getItem("routerAppointments") || "[]"
  );

  return (
    <div>
      <h3>Appointment History</h3>

      {appointments.length === 0 ? (
        <p>No appointments available.</p>
      ) : (
        appointments.map((a) => (
          <div className="card" key={a.id}>
            <p>Doctor: {a.doctor}</p>
            <p>Date: {a.date}</p>
            <p>Time: {a.time}</p>
            <p>Status: Confirmed</p>
          </div>
        ))
      )}
    </div>
  );
}