import { FormEvent } from "react";
import { useAuth } from "context/auth-context";
const LoginScreen = () => {
  const { login, user } = useAuth();
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
      {user ? (
        <div>
          success, {user.name} token: {user.token}
        </div>
      ) : null}
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
