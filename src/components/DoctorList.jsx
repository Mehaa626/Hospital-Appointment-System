import { useAppointmentContext } from "../context/AppointmentContext";
import SearchBar from "./SearchBar";
import FilterPanel from "./FilterPanel";
import DoctorCard from "./DoctorCard";

export default function DoctorList() {
  const { availableDoctors } = useAppointmentContext();

  return (
    <section id="doctors">
      <h2>Find a Doctor</h2>

      <SearchBar />
      <FilterPanel />

      <div className="grid">
        {availableDoctors.length > 0 ? (
          availableDoctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))
        ) : (
          <p>No doctors available.</p>
        )}
      </div>
    </section>
  );
}