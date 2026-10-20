let doctors = [
  { id: "101", name: "Dr. Priya Sharma", specialty: "Cardiology" },
  { id: "102", name: "Dr. Arun Kumar", specialty: "Neurology" },
  { id: "103", name: "Dr. Meena Raj", specialty: "Dermatology" }
];

let appointments = [
  {
    id: "1",
    patient: "Mehaa",
    doctorId: "101",
    doctorName: "Dr. Priya Sharma",
    date: "2027-11-15",
    time: "09:00 AM",
    status: "Booked"
  }
];

export const getDoctors = async () => {
  return [...doctors];
};

export const getAppointments = async () => {
  return [...appointments];
};

export const createAppointment = async (data) => {
  const appointment = {
    id: String(Date.now()),
    ...data,
    status: "Booked"
  };

  appointments.push(appointment);
  return appointment;
};

export const updateAppointment = async (id, data) => {
  const index = appointments.findIndex((a) => a.id === String(id));

  if (index === -1) {
    throw new Error("Appointment not found");
  }

  appointments[index] = {
    ...appointments[index],
    ...data
  };

  return appointments[index];
};

export const deleteAppointment = async (id) => {
  const exists = appointments.some((a) => a.id === String(id));

  if (!exists) {
    throw new Error("Appointment not found");
  }

  appointments = appointments.filter((a) => a.id !== String(id));
};