import { Button, Form, FormLayout, Page, TextField } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginFetch } from "../api/apiConstants";
import ReduxState from "../hoc/ReduxState";
import { saveUser } from "../redux/LoginSlice";

const Login = ({ state, dispatch }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const loginHandler = async () => {
    setLoading(true);
    let res = await loginFetch(
      new URLSearchParams({ username: username, password: password })
    );
    setLoading(false);
    if (res.success) {
      sessionStorage.setItem(
        "user",
        JSON.stringify({ key: res.data.token, name: name })
      );
      dispatch(saveUser);
      nav("/dashboard");
    } else alert(res.message);
  };

  useEffect(() => {
    state && nav("/dashboard");
  }, [state]);

  return (
    <Page>
      <Form onSubmit={loginHandler} autoComplete={false}>
        <FormLayout>
          <TextField
            label="Your Name"
            type="text"
            value={name}
            onChange={(value) => setName(value)}
            helpText="We'll show this Name to your profile"
          />
          <TextField
            label="Username"
            type="text"
            value={username}
            onChange={(value) => setUsername(value)}
            helpText="Enter your username"
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(value) => setPassword(value)}
            helpText="Never Disclose your password to anyone"
          />
          <Button submit primary loading={loading}>
            Submit
          </Button>
        </FormLayout>
      </Form>
    </Page>
  );
};

export default ReduxState(Login, "user");
