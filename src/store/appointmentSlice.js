
import { createSlice, nanoid } from "@reduxjs/toolkit";

const appointmentSlice = createSlice({
  name: "appointments",
  initialState: {
    appointments: [],
    status: "idle"
  },
  reducers: {
    bookAppointment: (state, action) => {
      state.appointments.push({
        id: nanoid(),
        ...action.payload,
        status: "Booked"
      });
    },

    rescheduleAppointment: (state, action) => {
      const appointment = state.appointments.find(
        (a) => a.id === action.payload.id
      );

      if (appointment) {
        appointment.date = action.payload.date;
        appointment.time = action.payload.time;
        appointment.status = "Rescheduled";
      }
    },

    cancelAppointment: (state, action) => {
      const appointment = state.appointments.find(
        (a) => a.id === action.payload
      );

      if (appointment) {
        appointment.status = "Cancelled";
      }
    }
  }
});

export const {
  bookAppointment,
  rescheduleAppointment,
  cancelAppointment
} = appointmentSlice.actions;

export default appointmentSlice.reducer;

