
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loadDoctors = createAsyncThunk(
  "doctors/load",
  async () => {
    // Demo data; no API server required
    return [
      { id: "101", name: "Dr. Priya Sharma", specialty: "Cardiology" },
      { id: "102", name: "Dr. Arun Kumar", specialty: "Neurology" },
      { id: "103", name: "Dr. Meena Raj", specialty: "Dermatology" }
    ];
  },
  {
    condition: (_, { getState }) => {
      // Use cached data if already loaded
      return getState().doctors.status !== "succeeded";
    }
  }
);

const doctorSlice = createSlice({
  name: "doctors",
  initialState: {
    doctors: [],
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadDoctors.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loadDoctors.fulfilled, (state, action) => {
        state.doctors = action.payload;
        state.status = "succeeded";
      })
      .addCase(loadDoctors.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unable to load doctors";
      });
  }
});

export default doctorSlice.reducer;

