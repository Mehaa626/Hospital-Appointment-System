
import { useState } from "react";
import {
  login,
  logout,
  getHistory,
  bookAppointment,
  rescheduleAppointment,
  cancelAppointment
} from "../services/authApi";

export default function Authentication() {
  const [email, setEmail] = useState("patient@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loggedIn, setLoggedIn] = useState(
    Boolean(localStorage.getItem("authToken"))
  );
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState("");

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
      setHistory(await getHistory());
      setMessage("Appointment history loaded.");
    } catch (error) {
      setMessage(error.message);
      setLoggedIn(false);
    }
  }

  async function book() {
    try {
      await bookAppointment({
        patient: email,
        doctor: "Dr. Priya Sharma",
        date: "2027-11-15"
      });
      setMessage("Appointment booked!");
      await loadHistory();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function reschedule(id) {
    const date = window.prompt("Enter new date (YYYY-MM-DD):");
    if (!date) return;

    try {
      await rescheduleAppointment(id, date);
      setMessage("Appointment rescheduled!");
      await loadHistory();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function cancel(id) {
    try {
      await cancelAppointment(id);
      setMessage("Appointment cancelled!");
      await loadHistory();
    } catch (error) {
      setMessage(error.message);
    }
  }

  function handleLogout() {
    logout();
    setLoggedIn(false);
    setHistory([]);
    setMessage("You have logged out.");
  }

  return (
    <div className="auth-container">
      <h1>CareNest Patient Login</h1>

      {!loggedIn ? (
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
          <p>Demo: patient@gmail.com / 123456</p>
        </form>
      ) : (
        <>
          <h2>Welcome, Patient!</h2>
          <button onClick={book}>Book Appointment</button>
          <button onClick={loadHistory}>View History</button>
          <button onClick={handleLogout}>Logout</button>

          <h2>Appointment History</h2>

          {history.map((a) => (
            <div className="auth-card" key={a.id}>
              <p>Doctor: {a.doctor}</p>
              <p>Date: {a.date}</p>
              <p>Status: {a.status}</p>
              <button onClick={() => reschedule(a.id)}>
                Reschedule
              </button>
              <button onClick={() => cancel(a.id)}>
                Cancel
              </button>
            </div>
          ))}
        </>
      )}

      {message && <p>{message}</p>}
    </div>
  );
}
