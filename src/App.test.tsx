import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders connect 4 title", () => {
  render(<App />);
  const linkElement = screen.getByText(/connect 4/i);
  expect(linkElement).toBeInTheDocument();
});
