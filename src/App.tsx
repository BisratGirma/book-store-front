import React, { useState } from "react";
import "./App.css";
import CardList from "./components/card_list";
import HeroSection from "./components/hero";

function App() {
  const [searchKey, setSearchKey] = useState("");
  return (
    <div className="App">
      <HeroSection setSeachKey={setSearchKey} />
      <div style={{ marginBottom: 20 }}></div>
      <CardList search={searchKey} />
    </div>
  );
}

export default App;
