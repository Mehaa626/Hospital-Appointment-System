
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getDoctorById } from "../services/api";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDoctor() {
    try {
      setLoading(true);
      setError("");
      const data = await getDoctorById(id);
      setDoctor(data);
    } catch {
      setError("Doctor details could not be loaded.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDoctor();
  }, [id]);

  if (loading) return <Loading />;

  if (error) {
    return (
      <main className="page">
        <ErrorMessage message={error} onRetry={loadDoctor} />
      </main>
    );
  }

  if (!doctor) {
    return <main className="page"><h2>Doctor not found.</h2></main>;
  }

  return (
    <main className="page">
      <section className="panel profile">
        <div className="doctor-avatar">✚</div>
        <h1>{doctor.name}</h1>
        <h3>{doctor.specialty}</h3>
        <p>{doctor.description}</p>
        <p>Experience: {doctor.experience} years</p>
        <p>Consultation fee: ₹{doctor.fee}</p>
        <Link className="btn" to={`/booking/${doctor.id}`}>
          Check Availability
        </Link>
      </section>
    </main>
  );
}
