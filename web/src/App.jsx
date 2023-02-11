import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Dashbord } from "./pages/Dashbord/Dashbord"
import { Images } from "./pages/Fotos/Images"
import { Login } from "./pages/Login/Login"
import { Register } from "./pages/Login/Register"
import { MyPerfil } from "./pages/MyPerfil/MyPerfil"

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/cadastro-usuario" element={<Register />}/>
          <Route path="/dashbord" element={<Dashbord />}/>
          <Route path="/usuario" element={<MyPerfil />}/>
          <Route path="/fotos" element={<Images />}/>
        </Routes>
    </BrowserRouter>
  )
}

export default App
