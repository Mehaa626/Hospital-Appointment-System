import { NavLink, Outlet } from "react-router-dom";

export default function PatientLayout() {
  return (
    <section>
      <h2>Patient Dashboard</h2>

      <nav className="patient-nav">
        <NavLink to="/patient" end>Dashboard</NavLink>
        <NavLink to="/patient/appointments">Appointments</NavLink>
        <NavLink to="/patient/upcoming">Upcoming</NavLink>
        <NavLink to="/patient/history">History</NavLink>
        <NavLink to="/patient/profile">Profile</NavLink>
      </nav>

      <Outlet />
    </section>
  );
}