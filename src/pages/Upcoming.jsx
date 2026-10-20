export default function Upcoming() {
  const appointments = JSON.parse(
    localStorage.getItem("routerAppointments") || "[]"
  );

  const today = new Date().toLocaleDateString("en-CA");

  const upcoming = appointments.filter((a) => a.date >= today);

  return (
    <div>
      <h3>Upcoming Appointments</h3>

      {upcoming.length === 0 ? (
        <p>No upcoming appointments.</p>
      ) : (
        upcoming.map((a) => (
          <div className="card" key={a.id}>
            <p>{a.doctor}</p>
            <p>{a.date} at {a.time}</p>
          </div>
        ))
      )}
    </div>
  );
}