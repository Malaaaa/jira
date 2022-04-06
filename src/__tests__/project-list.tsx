import React, { ReactNode } from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import fakeData from "./fake.json";
import { render, screen, waitFor } from "@testing-library/react";
import { ProjectListScreen } from "screens/project-list";
import { AppProviders } from "context";

const apiUrl = process.env.REACT_APP_API_URL;
const fakeAuth = {
  id: 1,
  name: "jack",
  token: "123",
};

const server = setupServer(
  rest.get(`${apiUrl}/me`, (req, res, ctx) => res(ctx.json(fakeAuth))),
  rest.get(`${apiUrl}/users`, (req, res, ctx) => res(ctx.json(fakeData.users))),
  rest.get(`${apiUrl}/projects`, (req, res, ctx) => {
    const { name = "", personId = undefined } = Object.fromEntries(
      req.url.searchParams
    );
    const result = fakeData?.projects?.filter((project) => {
      return (
        project.name.includes(name) &&
        (personId ? project.personId === +personId : true)
      );
    });
    return res(ctx.json(result));
  })
);

// jest is one of the most react-friendly test libraries
// beforeAll means to execute all the tests before executing the callback function
beforeAll(() => server.listen());

// Reset the mock route after each test run
afterEach(() => server.resetHandlers());

// After all the tests are run, close the mock route
afterAll(() => server.close());

const waitTable = () =>
  waitFor(
    () => expect(screen.getByText("Rider Management")).toBeInTheDocument(),
    {
      timeout: 3000,
    }
  );
test("Project list display normal", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(fakeData.projects.length + 1);
});

test("Search for a project", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects?name=Riders" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(2);
  expect(screen.getByText("Rider Management")).toBeInTheDocument();
});

export const renderScreen = (ui: ReactNode, { route = "/projects" } = {}) => {
  window.history.pushState({}, "Test page", route);

  return render(<AppProviders>{ui}</AppProviders>);
};
