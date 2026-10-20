
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <h1>🌿 CareNest</h1>

      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/doctors">Doctors</NavLink>
        <NavLink to="/book-appointment">Booking</NavLink>
        <NavLink to="/appointments">History</NavLink>
        <NavLink to="/patient">Patient</NavLink>
      </nav>
    </header>
  );
}