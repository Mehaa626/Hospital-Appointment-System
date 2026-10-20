
let token = null;

const appointments = [];

const demoUser = {
  email: "patient@gmail.com",
  password: "123456"
};

// Login API (demo)
export async function login(email, password) {
  if (email !== demoUser.email || password !== demoUser.password) {
    throw new Error("Invalid email or password");
  }

  token = "demo-token-" + Date.now();
  localStorage.setItem("authToken", token);

  console.log("Login successful");
  console.log("Token stored:", Boolean(token));

  return { email, token };
}

// Get token
export function getToken() {
  return localStorage.getItem("authToken");
}

// Protect API requests
function checkAuth() {
  const savedToken = getToken();

  if (!savedToken || !savedToken.startsWith("demo-token-")) {
    localStorage.removeItem("authToken");
    token = null;
    throw new Error("Unauthorized. Please login again.");
  }

  return savedToken;
}

// Protected: GET appointment history
export async function getHistory() {
  checkAuth();
  console.log("GET /appointments - Authorized");
  return [...appointments];
}

// Protected: POST appointment
export async function bookAppointment(data) {
  checkAuth();

  const newAppointment = {
    id: Date.now(),
    ...data,
    status: "Booked"
  };

  appointments.push(newAppointment);
  console.log("POST /appointments - Authorized");

  return newAppointment;
}

// Protected: PATCH appointment
export async function rescheduleAppointment(id, date) {
  checkAuth();

  const appointment = appointments.find((a) => a.id === id);

  if (!appointment) throw new Error("Appointment not found");

  appointment.date = date;
  appointment.status = "Rescheduled";

  console.log("PATCH /appointments - Authorized");
  return appointment;
}

// Protected: DELETE appointment
export async function cancelAppointment(id) {
  checkAuth();

  const index = appointments.findIndex((a) => a.id === id);

  if (index === -1) throw new Error("Appointment not found");

  appointments.splice(index, 1);
  console.log("DELETE /appointments - Authorized");
}

// Logout
export function logout() {
  localStorage.removeItem("authToken");
  token = null;
  console.log("Logged out. Token removed.");
}
