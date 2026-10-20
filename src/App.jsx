
import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(true);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="page">
        <div className="card">
          <h2>Loading doctors...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page">
        <div className="card">
          <h1>Hospital Appointment System</h1>
          <h2 className="error">Error loading doctors!</h2>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }

  return null;
}

export default App;
