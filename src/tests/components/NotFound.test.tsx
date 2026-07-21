import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import NotFound from "../../components/NotFound";
import store from "../../store";

describe("NotFound", () => {
  it("should render the NotFound component", () => {
    const component = render(
      <Provider store={store}>
        <MemoryRouter>
          <NotFound />
        </MemoryRouter>
      </Provider>,
    );
    expect(component).toMatchSnapshot();
  });
});
