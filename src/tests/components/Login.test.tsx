import { fireEvent, render, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Login from "../../components/Login";
import store from "../../store";

describe("Login", () => {
  it("should render the login component", () => {
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );

    expect(component).toMatchSnapshot();
  });

  it("should display an error message for invalid login", async () => {
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );

    const submitButton = component.getByRole("button", { name: /Login/i });
    expect(submitButton).toBeInTheDocument();
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(
          component.getByText(/Invalid username or password/i),
        ).toBeInTheDocument();
      },
      {
        timeout: 2000,
        interval: 100,
      },
    );
  });

  it("should redirect to home route after successful login", async () => {
    const component = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/login"]}>
          <Routes>
            <Route path="/" element={<div>New Questions</div>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const userInput = component.getByPlaceholderText(/User/i);
    const passwordInput = component.getByPlaceholderText(/Password/i);
    const submitButton = component.getByRole("button", { name: /Login/i });
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(userInput, { target: { value: "sarahedo" } });
    fireEvent.change(passwordInput, { target: { value: "password123!@" } });
    fireEvent.click(submitButton);

    await waitFor(
      () => {
        expect(component.getByText(/New Questions/i)).toBeInTheDocument();
      },
      {
        timeout: 4000,
        interval: 100,
      },
    );
  });
});
