import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './pages/Login.jsx';

function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== '/';

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
  
export default App;