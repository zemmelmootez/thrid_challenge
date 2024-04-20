import React from "react";
import { Route, Router, Routes } from "react-router";
import Symtomps from "./components/Symptoms";
import SymptomsHistory from "./components/History";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Symtomps />} />
        <Route path="/history" element={<SymptomsHistory />} />
      </Routes>
    </div>
  );
}

export default App;
