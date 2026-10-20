import { useParams, useNavigate } from "react-router-dom";

const doctors = [
  {
    id: "101",
    name: "Dr. Priya Sharma",
    specialty: "Cardiology",
    qualification: "MBBS, MD Cardiology",
    experience: 8,
    rating: 4.8,
    fee: 800,
    days: "Monday, Wednesday, Friday",
    slots: ["09:00 AM", "10:00 AM", "02:00 PM"]
  },
  {
    id: "102",
    name: "Dr. Arun Kumar",
    specialty: "Neurology",
    qualification: "MBBS, DM Neurology",
    experience: 6,
    rating: 4.5,
    fee: 700,
    days: "Tuesday, Thursday, Saturday",
    slots: ["10:00 AM", "11:00 AM", "03:00 PM"]
  },
  {
    id: "103",
    name: "Dr. Meena Raj",
    specialty: "Dermatology",
    qualification: "MBBS, MD Dermatology",
    experience: 5,
    rating: 4.6,
    fee: 600,
    days: "Monday, Tuesday, Friday",
    slots: ["09:00 AM", "11:00 AM", "02:00 PM"]
  }
];

export { doctors };

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = doctors.find((item) => item.id === id);

  if (!doctor) {
    return <section><h2>Doctor not found</h2></section>;
  }

  return (
    <section>
      <h2>Doctor Profile</h2>
      <h3>{doctor.name}</h3>
      <p>Doctor ID: {doctor.id}</p>
      <p>Specialty: {doctor.specialty}</p>
      <p>Qualification: {doctor.qualification}</p>
      <p>Experience: {doctor.experience} years</p>
      <p>Rating: ⭐ {doctor.rating}</p>
      <p>Consultation Fee: ₹{doctor.fee}</p>
      <p>Available Days: {doctor.days}</p>
      <p>Available Time Slots: {doctor.slots.join(", ")}</p>

      <button onClick={() => navigate(`/appointment/${doctor.id}`)}>
        Book Appointment
      </button>
    </section>
  );
}