export default function Profile() {
  const appointments = JSON.parse(
    localStorage.getItem("routerAppointments") || "[]"
  );

  const patient = appointments[appointments.length - 1];

  return (
    <div>
      <h3>Patient Profile</h3>

      {patient ? (
        <>
          <p>Name: {patient.name}</p>
          <p>Email: {patient.email}</p>
          <p>Phone: {patient.phone}</p>
        </>
      ) : (
        <p>No patient profile available. Book an appointment first.</p>
      )}
    </div>
  );
}