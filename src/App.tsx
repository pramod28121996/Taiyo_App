import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Contacts from "./pages/Contacts";

function App() {
  return (
    <div className="w-full h-screen flex flex-cols text-center">
      <Routes>
        <Route path="/" element={<Dashboard />} />        
        <Route path="/contacts" element={<Contacts />} />
      </Routes>
    </div>
  );
}

export default App;
