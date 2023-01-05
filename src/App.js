import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import LogIn from "./LogIn";
import MyTask from "./MyTask";
import Navbar from "./Navbar";
import NewTask from "./NewTask";
import Register from "./Register";

export const backendURL = "https://to-do-node-sandy.onrender.com";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/mytask"
            element={
              <>
                <NewTask /> <MyTask />
              </>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
