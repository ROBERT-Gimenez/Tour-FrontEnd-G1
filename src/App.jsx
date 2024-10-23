import './App.css'
import { Route, Routes } from "react-router-dom";
import Home from './routes/Home';

function App() {
  return (
    <>
     <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<h1>Error 404 - Page not Found</h1>} />
      </Routes>
    </>
  )
}

export default App
