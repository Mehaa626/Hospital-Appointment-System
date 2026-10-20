
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">CARE NEST HOSPITAL</p>
        <h1>Your Health, Our Priority</h1>
        <p>Find doctors and book your appointment easily.</p>
        <Link className="btn" to="/doctors">
          Find a Doctor
        </Link>
      </section>
    </main>
  );
}
