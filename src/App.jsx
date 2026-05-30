import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import Database from "./Database";
import Description from "./Descrpition";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/database" element={<Database />} />
        <Route path="/description" element={<Description />} />
      </Routes>
    </BrowserRouter>
  );
}