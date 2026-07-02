import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import Header from "../components/layouts/Header";
import authReducer from "../features/auth/authSlice";
import uiReducer from "../features/settings/uiSlice";
import notificationReducer from "../features/notification/notificationSlice";
import procurementReducer from "../features/procurement/procurementSlice";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Header additional coverage", () => {
  test("renders unread count from notifications and requests", () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
        ui: uiReducer,
        notification: notificationReducer,
        procurement: procurementReducer,
      },
      preloadedState: {
        auth: {
          user: {
            role: "Employee",
            email: "employee@example.com",
          },
          isAuthenticated: true,
        },
        ui: {
          darkMode: true,
          compactLayout: false,
        },
        notification: {
          data: [{ id: 1, status: "Unread", recipientEmail: "employee@example.com" }],
          loading: false,
          error: null,
        },
        procurement: {
          data: [{ id: 101, status: "Pending", submittedByEmail: "employee@example.com" }],
          loading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("2")).toBeInTheDocument();
  });

  test("navigates to notifications when notification action is clicked", () => {
    const store = configureStore({
      reducer: {
        auth: authReducer,
        ui: uiReducer,
        notification: notificationReducer,
        procurement: procurementReducer,
      },
      preloadedState: {
        auth: {
          user: {
            role: "Admin",
            email: "admin@example.com",
          },
          isAuthenticated: true,
        },
        ui: {
          darkMode: false,
          compactLayout: false,
        },
        notification: {
          data: [],
          loading: false,
          error: null,
        },
        procurement: {
          data: [],
          loading: false,
          error: null,
        },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByLabelText(/notifications/i));
    expect(mockNavigate).toHaveBeenCalledWith("/notifications");
  });
});
