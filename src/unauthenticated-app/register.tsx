import { useAuth } from "context/auth-context";
import { Button, Form, Input } from "antd";
import { useAsync } from "utils/use-async";

const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth();
  const { run, isLoading } = useAsync(undefined, { throwOnError: true });
  // HTMLFormElement extends Element
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    if (cpassword !== values.password) {
      onError(new Error("Please make sure you enter the same password"));
      return;
    }
    try {
      await run(register(values));
    } catch (e) {
      onError(e);
    }
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
      <Form.Item
        name={"cpassword"}
        rules={[{ required: true, message: "Please confirm the password" }]}
      >
        <Input
          placeholder={"confirm password"}
          type="password"
          id={"cpassword"}
        />
      </Form.Item>
      <Button loading={isLoading} block type="primary" htmlType="submit">
        Sign up
      </Button>
    </Form>
  );
};
export default RegisterScreen;
