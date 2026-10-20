
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Authentication from "../components/Authentication";

import {
  login,
  logout,
  getHistory,
  bookAppointment,
  cancelAppointment,
} from "../services/authApi";

jest.mock("../services/authApi", () => ({
  login: jest.fn(),
  logout: jest.fn(),
  getHistory: jest.fn(),
  bookAppointment: jest.fn(),
  rescheduleAppointment: jest.fn(),
  cancelAppointment: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
});

test("displays the patient login form", () => {
  render(<Authentication />);

  expect(screen.getByText("CareNest Patient Login")).toBeInTheDocument();
  expect(screen.getByDisplayValue("patient@gmail.com")).toBeInTheDocument();
  expect(screen.getByDisplayValue("123456")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
});

test("logs in successfully", async () => {
  login.mockResolvedValueOnce({});

  render(<Authentication />);
  fireEvent.click(screen.getByRole("button", { name: "Login" }));

  expect(await screen.findByText("Login successful!")).toBeInTheDocument();
  expect(screen.getByText("Welcome, Patient!")).toBeInTheDocument();
});

test("shows login error", async () => {
  login.mockRejectedValueOnce(new Error("Invalid login"));

  render(<Authentication />);
  fireEvent.click(screen.getByRole("button", { name: "Login" }));

  expect(await screen.findByText("Invalid login")).toBeInTheDocument();
});

test("books an appointment", async () => {
  localStorage.setItem("authToken", "test-token");
  getHistory.mockResolvedValue([]);
  bookAppointment.mockResolvedValueOnce({});

  render(<Authentication />);
  fireEvent.click(screen.getByRole("button", { name: "Book Appointment" }));

  await waitFor(() => {
    expect(bookAppointment).toHaveBeenCalledWith({
      patient: "patient@gmail.com",
      doctor: "Dr. Priya Sharma",
      date: "2027-11-15",
    });
  });
});

test("loads appointment history", async () => {
  localStorage.setItem("authToken", "test-token");
  getHistory.mockResolvedValueOnce([]);

  render(<Authentication />);
  fireEvent.click(screen.getByRole("button", { name: "View History" }));

  expect(
    await screen.findByText("Appointment history loaded.")
  ).toBeInTheDocument();
});

test("logs out the patient", async () => {
  localStorage.setItem("authToken", "test-token");

  render(<Authentication />);
  fireEvent.click(screen.getByRole("button", { name: "Logout" }));

  expect(await screen.findByText("You have logged out.")).toBeInTheDocument();
  expect(logout).toHaveBeenCalled();
  expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
});

test("cancels an appointment", async () => {
  localStorage.setItem("authToken", "test-token");

  getHistory.mockResolvedValue([
    {
      id: 1,
      doctor: "Dr. Priya Sharma",
      date: "2027-11-15",
      status: "Booked",
    },
  ]);
  cancelAppointment.mockResolvedValueOnce({});

  render(<Authentication />);

  fireEvent.click(screen.getByRole("button", { name: "View History" }));

  expect(
    await screen.findByText("Doctor: Dr. Priya Sharma")
  ).toBeInTheDocument();

  fireEvent.click(await screen.findByRole("button", { name: "Cancel" }));

  await waitFor(() => {
    expect(cancelAppointment).toHaveBeenCalledWith(1);
  });
});

