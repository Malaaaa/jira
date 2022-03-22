import { useAuth } from "context/auth-context";
import { Button, Form, Input } from "antd";
const LoginScreen = () => {
  const { login } = useAuth();
  // HTMLFormElement extends Element
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name="username"
        rules={[{ required: true, message: "Please enter your username" }]}
      >
        <Input placeholder="username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Please enter your password" }]}
      >
        <Input placeholder="password" type="password" />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Login
      </Button>
    </Form>
  );
};
export default LoginScreen;
