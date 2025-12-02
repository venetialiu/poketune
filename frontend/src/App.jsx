import { useState } from 'react'
import About from './components/About/About'
import Auth from './components/Auth/Auth'
import Show from './components/Show/Show'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // TBD:
  // Rehydrate user from localStorage so Google login persists across reloads
  //  Rehydrate JWT
  

  return (
    <>
      <UserContext.Provider value={{ currentUser, setCurrentUser, isLoading }}>
        <Router>
          <Routes>
            {/* auth is the first page users land on */}
            <Route path="/" element={<div className="App"><Auth /></div>} />
            <Route path="/auth" element={<Meeting/>} />
            <Route path="/about" element={<Home />} />
            <Route path="/show" element={<Profile />} />
            {/* to add: unique meeting page routes to ID */}
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  )
}

export default App
