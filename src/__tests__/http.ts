import { setupServer } from "msw/node";
import { rest } from "msw";
import { http } from "utils/http";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer();

// jest is one of the most react-friendly test libraries
// beforeAll means to execute all the tests before executing the callback function
beforeAll(() => server.listen());

// Reset the mock route after each test run
afterEach(() => server.resetHandlers());

// After all the tests are run, close the mock route
afterAll(() => server.close());

test("http method sends an asynchronous request", async () => {
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, (req, res, ctx) =>
      res(ctx.json(mockResult))
    )
  );

  const result = await http(endpoint);
  expect(result).toEqual(mockResult);
});

test("The http request will include the token in the header", async () => {
  const token = "FAKE_TOKEN";
  const endpoint = "test-endpoint";
  const mockResult = { mockValue: "mock" };

  let request: any;

  server.use(
    rest.get(`${apiUrl}/${endpoint}`, async (req, res, ctx) => {
      request = req;
      return res(ctx.json(mockResult));
    })
  );

  await http(endpoint, { token });
  expect(request.headers.get("Authorization")).toBe(`Bearer ${token}`);
});
