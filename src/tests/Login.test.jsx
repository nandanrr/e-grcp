import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import Login from "../features/auth/pages/Login";
import authReducer from "../features/auth/authSlice";
import uiReducer from "../features/settings/uiSlice";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const renderLogin = () => {
  const store = configureStore({
    reducer: {
      auth: authReducer,
      ui: uiReducer,
    },
    preloadedState: {
      auth: {
        user: null,
        isAuthenticated: false,
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
        <Login />
      </MemoryRouter>
    </Provider>
  );
};

describe("Login", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockReset();
  });

  test("prefills the saved email and checks remember me on reload", () => {
    localStorage.setItem("rememberedEmail", "manager@gmail.com");
    localStorage.setItem("rememberMe", "true");

    renderLogin();

    expect(screen.getByLabelText(/email address/i)).toHaveValue("manager@gmail.com");
    expect(screen.getByLabelText(/remember me/i)).toBeChecked();
  });

  test("stores the email when remember me is selected", async () => {
    const user = userEvent.setup();

    renderLogin();

    await user.type(screen.getByLabelText(/email address/i), "admin@gmail.com");
    await user.type(screen.getByLabelText(/^password/i), "admin123");
    await user.click(screen.getByLabelText(/remember me/i));
    await user.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(localStorage.getItem("rememberMe")).toBe("true");
    });

    expect(localStorage.getItem("rememberedEmail")).toBe("admin@gmail.com");
  });
});
