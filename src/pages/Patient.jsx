
import { useAuth } from "../context/AuthContext.jsx";

export default function Patient() {
  const { user } = useAuth();

  return (
    <main className="page">
      <h1>Patient Information</h1>

      <section className="panel patient-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Patient ID:</strong> {user.patientId}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
      </section>
    </main>
  );
}
