
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

// Cache doctors to avoid repeated data preparation
let doctorsCache = null;

export const getDoctors = async () => {
  if (!doctorsCache) {
    doctorsCache = doctors.map((doctor) => ({ ...doctor }));
  }

  return doctorsCache.map((doctor) => ({ ...doctor }));
};

export const getAppointments = async () => {
  return appointments.map((appointment) => ({ ...appointment }));
};

export const createAppointment = async (data) => {
  const appointment = {
    id: String(Date.now()),
    ...data,
    status: "Booked"
  };

  appointments = [...appointments, appointment];
  return { ...appointment };
};

export const updateAppointment = async (id, data) => {
  const index = appointments.findIndex((a) => a.id === String(id));

  if (index === -1) {
    throw new Error("Appointment not found");
  }

  const updated = {
    ...appointments[index],
    ...data
  };

  appointments = appointments.map((a) =>
    a.id === String(id) ? updated : a
  );

  return { ...updated };
};

export const deleteAppointment = async (id) => {
  const exists = appointments.some((a) => a.id === String(id));

  if (!exists) {
    throw new Error("Appointment not found");
  }

  appointments = appointments.filter((a) => a.id !== String(id));
};
