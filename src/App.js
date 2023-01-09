import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LogIn from "./User/LogIn";
import MyTask from "./Task/MyTask";
import Navbar from "./Layout/Navbar";
import Register from "./User/Register";

export const backendURL = "https://to-do-node-sandy.onrender.com";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route path="/mytask" element={<MyTask />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
