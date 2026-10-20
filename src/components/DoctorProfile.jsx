import { useAppointmentContext } from "../context/AppointmentContext";

export default function DoctorProfile() {
  const { selectedDoctor } = useAppointmentContext();

  if (!selectedDoctor) {
    return <p>Select a doctor to view the profile.</p>;
  }

  return (
    <section id="profile">
      <h2>Doctor Profile</h2>
      <h3>{selectedDoctor.name}</h3>
      <p>Specialty: {selectedDoctor.specialty}</p>
      <p>Experience: {selectedDoctor.experience} years</p>
      <p>Consultation Fee: ₹{selectedDoctor.fee}</p>
      <p>Rating: ⭐ {selectedDoctor.rating}</p>
      <p>Go to Booking to book an appointment.</p>
    </section>
  );
}