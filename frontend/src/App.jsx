import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Home from "./Components/Home";
import { useState } from "react";
import RefreshHandler from "./Components/RefreshHandler";
function App() {
  const [isauthenticated,setisauthenticated]=useState(false)
  const Privateroute=({ element })=>{
    return isauthenticated ? element : <Navigate to="/login"/>
  };

  return (
    <>
    <RefreshHandler setisauthenticated={setisauthenticated}/><Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Privateroute element={<Home />} />} />
    </Routes>
    </>
    
  );
}

export default App;
