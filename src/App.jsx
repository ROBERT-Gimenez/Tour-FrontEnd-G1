import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {

  return (
    <div className="App">
    <Routes>
      <Route path="*" element={<h1>Error 404 - Page not Found</h1>} />
    </Routes>
  </div>
  )
}

export default App
