import React from "react" 
import Home from "./pages/home";
import { Route, Routes } from "react-router-dom";
import UserLogin from "./pages/userLogin";
import UserSignup from "./pages/userSignup";
import CaptainLogin from "./pages/captainLogin";
import CaptainSignup from "./pages/captainSignup";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path ='/' element={<Home />} />
        <Route path ='/login' element={<UserLogin />} />
        <Route path ='/signup' element={<UserSignup />} />
        <Route path ='/captain-login' element={<CaptainLogin />} />
        <Route path ='/captain-signup' element={<CaptainSignup />} />
      </Routes>
    </div>
  )
}

export default App 