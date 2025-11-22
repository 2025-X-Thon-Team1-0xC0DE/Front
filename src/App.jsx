import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './pages/Login.jsx';
import MainPage from './pages/MainPage.jsx';
import WritingPage from './pages/WritingPage.jsx';
import MyPage from './pages/MyPage.jsx';

function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== '/';

  return (
    <>
      {showHeader && <Header />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/writing" element={<WritingPage />} />
        <Route path="/mypage" element={<MyPage />} />
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
