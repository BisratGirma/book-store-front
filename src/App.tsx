import React from "react";
import "./App.css";
import CardList from "./components/card_list";
import HeroSection from "./components/hero";

function App() {
  return (
    <div className="App">
      <HeroSection />
      <div style={{ marginBottom: 20 }}></div>
      <CardList />
    </div>
  );
}

export default App;
