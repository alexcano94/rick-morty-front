import "./App.css";
import { ProvideAuth } from "./hooks/Auth";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./hooks/PrivateRoute";
import { Home } from "./pages/Home/Home";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Singup";
import { CharacterDetail } from "./pages/CharacterDetail/CharacterDetail";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <ProvideAuth>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/character/:id"
              element={
                <PrivateRoute>
                  <CharacterDetail />
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ProvideAuth>
    </div>
  );
}

export default App;
