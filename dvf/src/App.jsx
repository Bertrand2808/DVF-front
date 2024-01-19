import { BrowserRouter, Routes, Route } from "react-router-dom";
import Formulaire from './Formulaire'

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<Formulaire />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
