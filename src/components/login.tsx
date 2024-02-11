import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router";
import { useStore } from "../store/index";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const setToken = useStore((state: any) => state.setToken);
  const setPoints = useStore((state: any) => state.setPoints);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const body: BodyInit = JSON.stringify({
      email,
      password,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        "https://bookstore-backend-d3x5.onrender.com/api/user/login",
        requestOptions
      );

      console.log("response: ", response.status);

      const res = await response.json();

      if (response.status === 200) {
        setToken(res.user?.token);
        setPoints(res.user?.points);
        navigate("/");
      } else {
        setErrorMessage(res.message);
      }
    } catch (error) {
      setErrorMessage("server error, please try again later!");
    }
  };

  return (
    <>
      {errorMessage.length > 0 && ErrorMessage({ message: errorMessage })}
      <Container>
        <LoginForm>
          <h1>Login</h1>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin}>Sign In</Button>
        </LoginForm>
      </Container>
    </>
  );
};

const ErrorMessage = ({ message }: { message: string }) => (
  <div
    style={{ backgroundColor: "#ffcccc", padding: "10px", textAlign: "center" }}
  >
    <p style={{ color: "#cc0000", fontWeight: "bold" }}>Login Failed:</p>
    <p style={{ color: "#cc0000" }}>{message}</p>
  </div>
);

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const LoginForm = styled.div`
  background-color: #f5f5f5;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;

  h1 {
    margin-bottom: 20px;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 10px 20px;
  cursor: pointer;
`;

export default LoginPage;
