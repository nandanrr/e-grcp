import {
  describe,
  test,
  expect,
} from "@jest/globals";

import {
  render,
  screen,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { MemoryRouter } from "react-router-dom";

import uiReducer from "../features/settings/uiSlice";
import procurementReducer from "../features/procurement/procurementSlice";
import notificationReducer from "../features/notification/notificationSlice";
import authReducer from "../features/auth/authSlice";

import CreateRequest from "../features/procurement/pages/CreateRequest";

const store = configureStore({

  reducer: {

    procurement: procurementReducer,

    notification: notificationReducer,

    ui: uiReducer,

    auth: authReducer,

  },

});

describe(
  "CreateRequest Form",
  () => {

    test(
      "renders procurement form",
      () => {

        render(

          <Provider store={store}>

            <MemoryRouter>

              <CreateRequest />

            </MemoryRouter>

          </Provider>

        );

        expect(

          screen.getByText(
            /Create Procurement Request/i
          )

        ).toBeInTheDocument();

        const requestNameInput = screen.getByLabelText(
          /Request Name/i
        );

        expect(requestNameInput).toBeInTheDocument();
        expect(requestNameInput).toHaveAttribute(
          "placeholder",
          "Example: Dell Latitude 5450 Laptops for Development Team"
        );
        expect(requestNameInput).toBeRequired();

        const descriptionInput = screen.getByLabelText(
          /Description/i
        );

        expect(descriptionInput).toHaveAttribute(
          "placeholder",
          "Describe why this procurement request is needed, expected business impact, and any additional information."
        );
        expect(descriptionInput).toBeRequired();

        expect(

          screen.getByRole(
            "button",
            {
              name: /Submit Request/i,
            }
          )

        ).toBeInTheDocument();

      }
    );

    test(
      "shows validation errors when submitting empty form",
      async () => {

        const user =
          userEvent.setup();

        render(

          <Provider store={store}>

            <MemoryRouter>

              <CreateRequest />

            </MemoryRouter>

          </Provider>

        );

        await user.click(

          screen.getByRole(
            "button",
            {
              name: /Submit Request/i,
            }
          )

        );

        expect(

          await screen.findByText(
            /Request Name is required/i
          )

        ).toBeInTheDocument();

        expect(

          await screen.findByText(
            /Department is required/i
          )

        ).toBeInTheDocument();

        expect(

          await screen.findByText(
            /Priority is required/i
          )

        ).toBeInTheDocument();

        expect(

          await screen.findByText(
            /Description is required/i
          )

        ).toBeInTheDocument();

      }
    );

    test(
      "allows typing into request name field",
      async () => {

        const user =
          userEvent.setup();

        render(

          <Provider store={store}>

            <MemoryRouter>

              <CreateRequest />

            </MemoryRouter>

          </Provider>

        );

        const input =
          screen.getByLabelText(
            /Request Name/i
          );

        await user.type(
          input,
          "Laptop Purchase"
        );

        expect(input)
          .toHaveValue(
            "Laptop Purchase"
          );

      }
    );

    test(
      "cancel button is rendered",
      () => {

        render(

          <Provider store={store}>

            <MemoryRouter>

              <CreateRequest />

            </MemoryRouter>

          </Provider>

        );

        expect(

          screen.getByRole(
            "button",
            {
              name: /Cancel/i,
            }
          )

        ).toBeInTheDocument();

      }
    );

  }
);