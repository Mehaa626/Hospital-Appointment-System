
import { Link } from "react-router-dom";

export default function DoctorCard({ doctor }) {
  return (
    <article className="doctor-card">
      <div className="doctor-avatar">✚</div>
      <h3>{doctor.name}</h3>
      <p>{doctor.specialty}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>Consultation fee: ₹{doctor.fee}</p>
      <Link className="btn" to={`/doctor/${doctor.id}`}>
        View Details
      </Link>
    </article>
  );
}

