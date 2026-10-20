
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    patientId: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");

  function update(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submit(e) {
    e.preventDefault();

    if (Object.values(form).some(value => !value.trim())) {
      return setError("Please fill in all fields.");
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return setError("Enter a valid email address.");
    }

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      return setError("Enter a valid 10-digit phone number.");
    }

    if (!/^[A-Za-z0-9_-]{4,15}$/.test(form.patientId)) {
      return setError("Patient ID must be 4-15 characters.");
    }

    if (form.password.length < 6) {
      return setError("Password must contain at least 6 characters.");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    signup(form);
    navigate("/login", {
      state: { message: "Account created. Please log in." }
    });
  }

  return (
    <main className="auth-page">
      <form className="panel auth-panel" onSubmit={submit}>
        <p className="eyebrow">CARE NEST HOSPITAL</p>
        <h1>Create Account</h1>

        <Input label="Full Name" name="name" value={form.name}
          onChange={update} placeholder="Enter full name" />

        <Input label="Patient ID" name="patientId" value={form.patientId}
          onChange={update} placeholder="e.g. PATIENT01" />

        <Input label="Email" name="email" type="email" value={form.email}
          onChange={update} placeholder="Enter email" />

        <Input label="Phone Number" name="phone" type="tel" value={form.phone}
          onChange={update} placeholder="10-digit phone number" />

        <Input label="Password" name="password" type="password"
          value={form.password} onChange={update} placeholder="Minimum 6 characters" />

        <Input label="Confirm Password" name="confirmPassword"
          type="password" value={form.confirmPassword}
          onChange={update} placeholder="Enter password again" />

        {error && <p className="error">{error}</p>}

        <Button type="submit">Create Account</Button>

        <p className="center">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </main>
  );
}
