
import { useEffect, useState } from "react";
import { getDoctors } from "../services/api";
import DoctorCard from "../components/DoctorCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadDoctors() {
    try {
      setLoading(true);
      setError("");
      const data = await getDoctors();
      setDoctors(data);
    } catch {
      setError("Could not fetch doctors. Check whether the API server is running.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDoctors();
  }, []);

  const specialties = [
    "All",
    ...new Set(doctors.map(d => d.specialty))
  ];

  const filtered = doctors.filter(doctor => {
    const matchesSearch =
      `${doctor.name} ${doctor.specialty}`
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesSpecialty =
      specialty === "All" || doctor.specialty === specialty;

    return matchesSearch && matchesSpecialty;
  });

  return (
    <main className="page">
      <h1>Find a Doctor</h1>
      <p>Search doctors and filter by speciality.</p>

      <div className="filters">
        <input
          className="search"
          placeholder="Search doctor..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className="search"
          value={specialty}
          onChange={e => setSpecialty(e.target.value)}
        >
          {specialties.map(item => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      {loading && <Loading />}

      {!loading && error && (
        <ErrorMessage message={error} onRetry={loadDoctors} />
      )}

      {!loading && !error && (
        <div className="doctor-grid">
          {filtered.map(doctor => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p>No matching doctors found.</p>
      )}
    </main>
  );
}
