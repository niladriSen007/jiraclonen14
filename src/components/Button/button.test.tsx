import { describe, expect, test } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import { Button } from ".";

describe("Button tests", () => {
  test("renders a button", () => {
    render(<Button onClick={() => {}} />);
    expect(screen.getByTestId("button-test")).toBeTruthy();
  });
});
