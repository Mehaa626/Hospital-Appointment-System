import { Outlet } from "react-router-dom";

export default function AppointmentsPage() {
  return (
    <section>
      <h2>Appointments</h2>
      <Outlet />
    </section>
  );
}