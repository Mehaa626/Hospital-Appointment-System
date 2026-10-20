import { useAppointmentContext } from "../context/AppointmentContext";

export default function FilterPanel() {
  const {
    specialty, setSpecialty,
    availability, setAvailability,
    maxFee, setMaxFee,
    minRating, setMinRating
  } = useAppointmentContext();

  return (
    <div className="filters">
      <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
        <option>All</option>
        <option>Cardiology</option>
        <option>Neurology</option>
        <option>Dermatology</option>
        <option>Pediatrics</option>
      </select>

      <select value={availability} onChange={(e) => setAvailability(e.target.value)}>
        <option>All</option>
        <option>Available</option>
        <option>Unavailable</option>
      </select>

      <label>
        Maximum fee: ₹{maxFee}
        <input
          type="range"
          min="500"
          max="1000"
          step="100"
          value={maxFee}
          onChange={(e) => setMaxFee(e.target.value)}
        />
      </label>

      <label>
        Minimum rating: {minRating}
        <input
          type="range"
          min="0"
          max="5"
          step="0.5"
          value={minRating}
          onChange={(e) => setMinRating(e.target.value)}
        />
      </label>
    </div>
  );
}