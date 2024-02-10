import "./App.css";
import CardList from "./components/card_list";
import HeroSection from "./components/hero";
import styled from "styled-components";
import { useStore } from "./store";
import { useNavigate, useRoutes } from "react-router";

const TopButtons = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  padding: 9px;
  margin-left: 10px;
`;

function App() {
  const navigate = useNavigate();
  const authenticated = useStore((state: any) => state.token.jwt);
  const removeToken = useStore((state: any) => state.removeToken);

  return (
    <div className="App">
      {authenticated ? (
        <TopButtons onClick={() => removeToken()}>
          <Button>Logout</Button>
        </TopButtons>
      ) : (
        <TopButtons>
          <Button onClick={() => navigate("/login")}>Login</Button> |{" "}
          <Button onClick={() => navigate("/signup")}>Signup</Button>
        </TopButtons>
      )}
      <HeroSection />
      <div style={{ marginBottom: 20 }}></div>
      <CardList />
    </div>
  );
}

export default App;
