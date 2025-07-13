// src/App.js
import React from 'react';
import { BrowserRouter , Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Search from './pages/Search';
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage';

function App() {
  
  return (
    <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<LandingPage />}/>
                <Route exact path="/auth" element={<AuthPage />} />
                <Route exact path="/recommend" element={<ProtectedRoute component={Search} />} />
            </Routes>
    </BrowserRouter>          
  );
}

export default App;
