
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  getDoctors,
  getHistory,
  bookAppointment,
  rescheduleAppointment,
  cancelAppointment
} from "../services/authApi";

import {
  setAppointments,
  addAppointment,
  updateAppointment,
  removeAppointment
} from "../store/appointmentSlice";

export default function Authentication() {
  const dispatch = useDispatch();
  const appointments = useSelector(
    (state) => state.appointments
  );

  const [email, setEmail] = useState("patient@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("authToken"))
  );
  const [doctors, setDoctors] = useState([]);
  const [doctorId, setDoctorId] = useState("101");
  const [date, setDate] = useState("2027-11-15");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getDoctors()
      .then(setDoctors)
      .catch(() => setMessage("Unable to load doctors."));
  }, []);

  useEffect(() => {
    if (loggedIn) {
      loadHistory();
    }
  }, [loggedIn]);

  async function handleLogin(e) {
    e.preventDefault();

    try {
      await login(email, password);
      setLoggedIn(true);
      setMessage("Login successful!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function loadHistory() {
    try {
      const data = await getHistory();
      dispatch(setAppointments(data));
      setMessage("Appointment history loaded.");
    } catch (error) {
      logout();
      setLoggedIn(false);
      dispatch(setAppointments([]));
      setMessage(error.message);
    }
  }

  async function handleBook(e) {
    e.preventDefault();

    try {
      const doctor = doctors.find(
        (d) => d.id === doctorId
      );

      const appointment = await bookAppointment({
        patient: email,
        doctorId,
        doctorName: doctor?.name || "Doctor",
        date
      });

      dispatch(addAppointment(appointment));
      setMessage("Appointment booked successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleReschedule(id) {
    const newDate = window.prompt(
      "Enter new date (YYYY-MM-DD):",
      "2027-11-20"
    );

    if (!newDate) return;

    if (!/^\d{4}-\d{2}-\d{2}$/.test(newDate)) {
      setMessage("Enter date in YYYY-MM-DD format.");
      return;
    }

    try {
      const updated = await rescheduleAppointment(id, newDate);
      dispatch(updateAppointment(updated));
      setMessage("Appointment rescheduled!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function handleCancel(id) {
    if (!window.confirm("Cancel this appointment?")) return;

    try {
      await cancelAppointment(id);
      dispatch(removeAppointment(id));
      setMessage("Appointment cancelled!");
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handleLogout() {
    logout();
    dispatch(setAppointments([]));
    setLoggedIn(false);
    setMessage("Logged out successfully.");
  }

  return (
    <main className="container">
      <header className="header">
        <h1>CareNest Hospital</h1>
        <p>Smart Hospital Appointment Booking</p>
      </header>

      {!loggedIn ? (
        <section className="panel">
          <h2>Patient Login</h2>

          <form onSubmit={handleLogin}>
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button type="submit">Login</button>
          </form>

          <p className="hint">
            Demo: patient@gmail.com / 123456
          </p>
        </section>
      ) : (
        <>
          <section className="panel">
            <div className="welcome">
              <h2>Welcome, Patient!</h2>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
            </div>

            <h3>Book Appointment</h3>

            <form onSubmit={handleBook}>
              <label>Select Doctor</label>
              <select
                value={doctorId}
                onChange={(e) => setDoctorId(e.target.value)}
              >
                {doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialty}
                  </option>
                ))}
              </select>

              <label>Appointment Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />

              <button type="submit">Book Appointment</button>
            </form>
          </section>

          <section className="panel">
            <div className="welcome">
              <h2>Appointment History</h2>
              <button className="secondary" onClick={loadHistory}>
                Refresh
              </button>
            </div>

            {appointments.length === 0 ? (
              <p>No appointments yet.</p>
            ) : (
              appointments.map((item) => (
                <article className="appointment" key={item.id}>
                  <h3>{item.doctorName}</h3>
                  <p>Date: {item.date}</p>
                  <p>Status: {item.status}</p>

                  <button
                    className="secondary"
                    onClick={() => handleReschedule(item.id)}
                  >
                    Reschedule
                  </button>

                  <button
                    className="danger"
                    onClick={() => handleCancel(item.id)}
                  >
                    Cancel
                  </button>
                </article>
              ))
            )}
          </section>
        </>
      )}

      {message && <p className="message">{message}</p>}
    </main>
  );
}
