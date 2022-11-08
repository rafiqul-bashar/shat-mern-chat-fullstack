import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Register, Login, Home, PickAvatar } from "./pages";
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pickAvatar" element={<PickAvatar />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
