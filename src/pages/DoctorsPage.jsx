
import { Link } from "react-router-dom";
import { doctors } from "./DoctorDetails";

export default function DoctorsPage() {
  return (
    <section>
      <h2>Our Doctors</h2>
      <p>Select a doctor to view the complete profile.</p>

      <div className="grid">
        {doctors.map((doctor) => (
          <div className="card" key={doctor.id}>
            <h3>{doctor.name}</h3>
            <p>Specialty: {doctor.specialty}</p>
            <p>Experience: {doctor.experience} years</p>
            <p>Fee: ₹{doctor.fee}</p>
            <p>Rating: ⭐ {doctor.rating}</p>

            <Link to={`/doctor/${doctor.id}`}>
              View Profile
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}