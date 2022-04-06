import React from "react";
import { render, screen } from "@testing-library/react";
import { Mark } from "components/mark";

test("Mark Components correctly highlighting keywords", () => {
  const name = "Material Management";
  const keyword = "Management";

  render(<Mark name={name} keyword={keyword} />);

  expect(screen.getByText(keyword)).toBeInTheDocument();
  expect(screen.getByText(keyword)).toHaveStyle("color: #257AFD");
  expect(screen.getByText("物料")).not.toHaveStyle("color: #257AFD");
});
