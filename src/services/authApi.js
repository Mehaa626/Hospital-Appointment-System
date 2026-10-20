
const doctors = [
  { id: "101", name: "Dr. Priya Sharma", specialty: "Cardiology" },
  { id: "102", name: "Dr. Arun Kumar", specialty: "Neurology" },
  { id: "103", name: "Dr. Meena Raj", specialty: "Dermatology" }
];

let appointments = [];
let nextId = 1;

export async function getDoctors() {
  console.log("➡️ REQUEST: GET /api/doctors");
  console.log("⬅️ RESPONSE: 200 OK", doctors);
  return doctors;
}

export async function login(email, password) {
  console.log("➡️ REQUEST: POST /api/login", { email });

  if (email !== "patient@gmail.com" || password !== "123456") {
    throw new Error("Invalid email or password");
  }

  localStorage.setItem("authToken", "demo-token");
  console.log("⬅️ RESPONSE: 200 OK — Login successful");
  return { token: "demo-token" };
}

export function logout() {
  localStorage.removeItem("authToken");
  console.log("➡️ LOGOUT: Token removed");
}

export async function getHistory() {
  console.log("➡️ REQUEST: GET /api/appointments");

  if (!localStorage.getItem("authToken")) {
    throw new Error("Please login first");
  }

  console.log("⬅️ RESPONSE: 200 OK", appointments);
  return [...appointments];
}

export async function bookAppointment(data) {
  console.log("➡️ REQUEST: POST /api/appointments", data);

  if (!localStorage.getItem("authToken")) {
    throw new Error("Please login first");
  }

  const appointment = {
    id: nextId++,
    ...data,
    status: "Booked"
  };

  appointments.push(appointment);
  console.log("⬅️ RESPONSE: 201 Created", appointment);
  return appointment;
}

export async function rescheduleAppointment(id, date) {
  console.log("➡️ REQUEST: PUT /api/appointments/" + id, { date });

  const appointment = appointments.find(
    (item) => item.id === id
  );

  if (!appointment) throw new Error("Appointment not found");

  appointment.date = date;
  console.log("⬅️ RESPONSE: 200 OK", appointment);
  return { ...appointment };
}

export async function cancelAppointment(id) {
  console.log("➡️ REQUEST: DELETE /api/appointments/" + id);

  appointments = appointments.filter(
    (item) => item.id !== id
  );

  console.log("⬅️ RESPONSE: 200 OK — Appointment cancelled");
  return { success: true };
}
