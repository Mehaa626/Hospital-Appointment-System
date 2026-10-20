import { useAppointmentContext } from "../context/AppointmentContext";

export default function SearchBar() {
  const { search, setSearch } = useAppointmentContext();

  return (
    <input
      type="text"
      placeholder="Search doctor..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}