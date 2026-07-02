import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import Header from "../components/layouts/Header";

import authReducer from "../features/auth/authSlice";
import uiReducer from "../features/settings/uiSlice";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Header Component", () => {

  const renderHeader = (role = "Admin") => {

    const store = configureStore({
      reducer: {
        auth: authReducer,
        ui: uiReducer,
      },
      preloadedState: {
        auth: {
          user: {
            role,
          },
          isAuthenticated: true,
        },
        ui: {
          darkMode: false,
          compactLayout: false,
        },
      },
    });

    return render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
  };

  test("renders logo and search", () => {

    renderHeader();

    expect(screen.getByText("e-GRCP")).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/Global Search/i)
    ).toBeInTheDocument();

  });

  test("opens profile menu", () => {

    renderHeader();

    fireEvent.click(screen.getByText("N"));

    expect(screen.queryByText("Profile")).not.toBeInTheDocument();

    expect(screen.queryByText("Settings")).not.toBeInTheDocument();

    expect(screen.getByText("Logout")).toBeInTheDocument();

  });

  test("toggles dark mode", () => {

    renderHeader();

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]);

  });

  test("logout button works", () => {

    renderHeader();

    fireEvent.click(screen.getByText("N"));

    fireEvent.click(screen.getByText("Logout"));

    expect(mockNavigate).toHaveBeenCalled();

  });


});