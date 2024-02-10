import "./App.css";
import CardList from "./components/card_list";
import HeroSection from "./components/hero";
import styled from "styled-components";
import { useAuthStore } from "./store";

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
  const authenticated = useAuthStore((state: any) => state.token);
  return (
    <div className="App">
      {!authenticated && (
        <TopButtons>
          <Button>Login</Button> |<Button>Signup</Button>
        </TopButtons>
      )}
      <HeroSection />
      <div style={{ marginBottom: 20 }}></div>
      <CardList />
    </div>
  );
}

export default App;
