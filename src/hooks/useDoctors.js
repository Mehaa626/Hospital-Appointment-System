import { useState, useMemo, useEffect } from "react";

const doctorData = [
  { id: 1, name: "Dr. Priya Sharma", specialty: "Cardiology", experience: 8, fee: 800, rating: 4.8, available: true },
  { id: 2, name: "Dr. Arun Kumar", specialty: "Neurology", experience: 6, fee: 700, rating: 4.5, available: true },
  { id: 3, name: "Dr. Meena Raj", specialty: "Dermatology", experience: 5, fee: 600, rating: 4.6, available: false },
  { id: 4, name: "Dr. Karthik", specialty: "Pediatrics", experience: 7, fee: 500, rating: 4.2, available: true }
];

export default function useDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [specialty, setSpecialty] = useState("All");
  const [availability, setAvailability] = useState("All");
  const [maxFee, setMaxFee] = useState(1000);
  const [minRating, setMinRating] = useState(0);

  useEffect(() => {
    setDoctors(doctorData);
  }, []);

  const availableDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const matchesSearch = doctor.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesSpecialty =
        specialty === "All" || doctor.specialty === specialty;

      const matchesAvailability =
        availability === "All" ||
        (availability === "Available" && doctor.available) ||
        (availability === "Unavailable" && !doctor.available);

      return (
        matchesSearch &&
        matchesSpecialty &&
        matchesAvailability &&
        doctor.fee <= Number(maxFee) &&
        doctor.rating >= Number(minRating)
      );
    });
  }, [doctors, search, specialty, availability, maxFee, minRating]);

  return {
    doctors,
    availableDoctors,
    search,
    setSearch,
    specialty,
    setSpecialty,
    availability,
    setAvailability,
    maxFee,
    setMaxFee,
    minRating,
    setMinRating
  };
}