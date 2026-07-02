import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import Sidebar from "../components/layouts/Sidebar";

import authReducer from "../features/auth/authSlice";

const renderSidebar = (role) => {

  const store = configureStore({
    reducer: {
      auth: authReducer,
    },
    preloadedState: {
      auth: {
        user: {
          role,
        },
        isAuthenticated: true,
      },
    },
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    </Provider>
  );

};

describe("Sidebar", () => {

  test("Admin sees all menus", () => {

    renderSidebar("Admin");

    expect(screen.getByText("Dashboard")).toBeInTheDocument();

    expect(screen.getByText("Procurement")).toBeInTheDocument();

    expect(screen.getByText("Audit")).toBeInTheDocument();

    expect(screen.getByText("Settings")).toBeInTheDocument();

    expect(screen.getByText("User Management")).toBeInTheDocument();

  });

  test("Manager menus", () => {

    renderSidebar("Manager");

    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Procurement")).toBeInTheDocument();
    expect(screen.getByText("Approval")).toBeInTheDocument();
    expect(screen.getByText("Vendors")).toBeInTheDocument();
    expect(screen.getByText("Risk")).toBeInTheDocument();
    expect(screen.getByText("Compliance")).toBeInTheDocument();
    expect(screen.getByText("Reports")).toBeInTheDocument();
    expect(screen.getByText("Notifications")).toBeInTheDocument();

    expect(screen.queryByText("Audit")).toBeNull();
    expect(screen.queryByText("Settings")).toBeNull();

  });

  test("Employee menus", () => {

    renderSidebar("Employee");

    expect(screen.getByText("Dashboard")).toBeInTheDocument();

    expect(screen.getByText("Procurement")).toBeInTheDocument();

    expect(screen.getByText("Notifications")).toBeInTheDocument();

    expect(screen.queryByText("Audit")).toBeNull();

    expect(screen.queryByText("Settings")).toBeNull();

  });

  test("Compliance Officer menus", () => {

    renderSidebar("Compliance Officer");

    expect(screen.getByText("Dashboard")).toBeInTheDocument();

    expect(screen.getByText("Compliance")).toBeInTheDocument();

    expect(screen.getByText("Notifications")).toBeInTheDocument();

    expect(screen.queryByText("Audit")).toBeNull();

  });

  test("Auditor menus", () => {

    renderSidebar("Auditor");

    expect(screen.getByText("Dashboard")).toBeInTheDocument();

    expect(screen.getByText("Audit")).toBeInTheDocument();

    expect(screen.getByText("Reports")).toBeInTheDocument();

    expect(screen.queryByText("Settings")).toBeNull();

  });

});