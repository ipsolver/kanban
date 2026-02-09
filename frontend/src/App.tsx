import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage'

function App() {

  return (
    <BrowserRouter>
      <h1>Tasks Manager</h1>

      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/:boardId" element={<MainPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
