
import { configureStore } from "@reduxjs/toolkit";
import appointmentReducer from "./appointmentSlice";
import doctorReducer from "./doctorSlice";

const appointmentLogger = (store) => (next) => (action) => {
  console.log("Appointment action:", action.type);
  return next(action);
};

const store = configureStore({
  reducer: {
    appointments: appointmentReducer,
    doctors: doctorReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(appointmentLogger)
});

export default store;
