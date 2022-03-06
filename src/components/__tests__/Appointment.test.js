/*
We are rendering `<Application />` down below, so we need React.createElement
*/
import React from "react";

/*
We import our helper functions from the react-testing-library
The render function allows us to render Components
*/
import { render } from "@testing-library/react";

/*
We import the component that we are testing
*/
import Appointment from '../Appointment'; // =<^;^>=


/*
  A test that renders a React Component
*/
describe("Appointment", () => {
  xit("renders without crashing", () => {
    render(<Appointment />);
  });

  xit("does something it is supposed to do", () => {
    const { getByText } = render(<Appointment />);
    expect(getByText("Confirm")).toHaveClass("button--confirm");
  });

  xit("does something else it is supposed to do", () => {
    const { getByText } = render(<Appointment />);
    expect(getByText("Confirm")).toHaveClass("button--confirm");
  });
});
