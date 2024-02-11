import "./App.css";
import CardList from "./components/card_list";
import HeroSection from "./components/hero";

import HeaderComponent from "./components/header";

function App() {
  return (
    <div className="App">
      <HeaderComponent />
      <HeroSection />
      <div style={{ marginBottom: 20 }}></div>
      <CardList />
    </div>
  );
}

export default App;
