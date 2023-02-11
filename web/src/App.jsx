import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashbord } from "./pages/Dashbord/Dashbord"
import { Login } from "./pages/Login/Login"
import { Register } from "./pages/Login/Register"

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/cadastro-usuario" element={<Register />}/>
          <Route path="/dashbord" element={<Dashbord />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
