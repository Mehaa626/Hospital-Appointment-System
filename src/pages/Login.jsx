
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import Input from "../components/Input.jsx";
import Button from "../components/Button.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [identity, setIdentity] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (!identity.trim() || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const message = login(identity, password);

    if (message) {
      setError(message);
      return;
    }

    navigate(location.state?.from?.pathname || "/", {
      replace: true
    });
  }

  return (
    <main className="auth-page">
      <form className="panel auth-panel" onSubmit={handleSubmit}>
        <div className="login-logo">✚</div>
        <p className="eyebrow">CARE NEST HOSPITAL</p>
        <h1>Welcome Back!</h1>
        <p className="muted">Login to manage your appointments.</p>

        <Input
          label="Patient ID / Email"
          value={identity}
          onChange={e => setIdentity(e.target.value)}
          placeholder="Enter Patient ID or email"
        />

        <Input
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        {error && <p className="error">{error}</p>}

        <Button type="submit">Login</Button>

        <p className="center">
          New patient? <Link to="/signup">Create Account</Link>
        </p>
      </form>
    </main>
  );
}
