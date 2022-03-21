import { FormEvent } from "react";

const apiUrl = process.env.REACT_APP_API_URL;
const LoginScreen = () => {
  const login = (param: { username: string; password: string }) => {
    fetch(`${apiUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    }).then(async (res) => {
      if (res.ok) {
      }
    });
  };
  // HTMLFormElement extends Element
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // const username = e.currentTarget.element[0].value;
    const username = (e.currentTarget.elements[0] as HTMLInputElement).value;
    const password = (e.currentTarget.elements[1] as HTMLInputElement).value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">username</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password" />
      </div>
      <button type="submit">login</button>
    </form>
  );
};
export default LoginScreen;
