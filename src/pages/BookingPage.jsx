import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doctors } from "./DoctorDetails";

export default function BookingPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const doctor = doctors.find((item) => item.id === id) || doctors[0];

  const [step, setStep] = useState(1);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  function nextStep() {
    if (step === 1 && !date) {
      alert("Please select an appointment date.");
      return;
    }

    if (step === 2 && !time) {
      alert("Please select a time slot.");
      return;
    }

    if (step === 3 && (!name.trim() || !email.trim() || !phone.trim())) {
      alert("Please fill in all patient details.");
      return;
    }

    if (step === 3 && !/^\S+@\S+\.\S+$/.test(email)) {
      alert("Enter a valid email address.");
      return;
    }

    if (step === 3 && !/^\d{10}$/.test(phone)) {
      alert("Enter a valid 10-digit phone number.");
      return;
    }

    setStep(step + 1);
  }

  function confirmBooking() {
    const booking = {
      id: Date.now(),
      doctor: doctor.name,
      date,
      time,
      name,
      email,
      phone,
      fee: doctor.fee
    };

    const saved = JSON.parse(
      localStorage.getItem("routerAppointments") || "[]"
    );

    localStorage.setItem(
      "routerAppointments",
      JSON.stringify([...saved, booking])
    );

    setConfirmed(true);
    setStep(5);
  }

  if (confirmed) {
    return (
      <section>
        <h2>Booking Confirmed!</h2>
        <p>Your appointment has been saved successfully.</p>
        <p>Doctor: {doctor.name}</p>
        <p>Date: {date}</p>
        <p>Time: {time}</p>
        <p>Patient: {name}</p>
        <p>Fee: ₹{doctor.fee}</p>
        <button onClick={() => navigate("/patient/appointments")}>
          View Appointments
        </button>
      </section>
    );
  }

  return (
    <section>
      <h2>Book Appointment</h2>
      <p>Step {step} of 4</p>
      <p>Doctor: {doctor.name}</p>
      <p>Specialty: {doctor.specialty}</p>
      <p>Consultation Fee: ₹{doctor.fee}</p>

      {step === 1 && (
        <>
          <h3>1. Select Date</h3>
          <input
            type="date"
            min={new Date().toLocaleDateString("en-CA")}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={nextStep}>Continue</button>
        </>
      )}

      {step === 2 && (
        <>
          <h3>2. Select Time Slot</h3>
          {doctor.slots.map((slot) => (
            <button
              key={slot}
              className={time === slot ? "selected" : ""}
              onClick={() => setTime(slot)}
            >
              {slot}
            </button>
          ))}
          <button onClick={() => setStep(1)}>Back</button>
          <button onClick={nextStep}>Continue</button>
        </>
      )}

      {step === 3 && (
        <>
          <h3>3. Patient Details</h3>
          <input
            placeholder="Patient Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            placeholder="10-digit Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={() => setStep(2)}>Back</button>
          <button onClick={nextStep}>Review Booking</button>
        </>
      )}

      {step === 4 && (
        <>
          <h3>4. Appointment Summary</h3>
          <p>Doctor: {doctor.name}</p>
          <p>Date: {date}</p>
          <p>Time: {time}</p>
          <p>Patient: {name}</p>
          <p>Email: {email}</p>
          <p>Phone: {phone}</p>
          <p>Fee: ₹{doctor.fee}</p>
          <button onClick={() => setStep(3)}>Back</button>
          <button onClick={confirmBooking}>Confirm Booking</button>
        </>
      )}
    </section>
  );
}