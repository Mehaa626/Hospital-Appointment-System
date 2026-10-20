
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Authentication = lazy(
  () => import("./components/Authentication")
);
const DoctorDetails = lazy(
  () => import("./pages/DoctorDetails")
);
const AppointmentsPage = lazy(
  () => import("./pages/AppointmentsPage")
);

export default function App() {
  return (
    <BrowserRouter basename="/Hospital-Appointment-System">
      <Suspense fallback={<p>Loading page...</p>}>
        <Routes>
          <Route path="/" element={<Authentication />} />
          <Route path="/doctor/:id" element={<DoctorDetails />} />
          <Route path="/appointment/:id" element={<AppointmentsPage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}


