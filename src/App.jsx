import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import MainPage from './pages/MainPage.jsx';
import WritingPage from './pages/WritingPage.jsx';
import MyPage from './pages/MyPage.jsx';

function AppContent() {
  const location = useLocation();
  const showHeader = location.pathname !== '/' && location.pathname !== '/signup';
  const isWritingPage = location.pathname === '/writing';
  const isMyPage = location.pathname === '/mypage';

  return (
    <>
      {showHeader && !isWritingPage && !isMyPage && <Header />}
      {isWritingPage && (
        <div className="writing-page-wrapper">
          <Header />
          <WritingPage />
        </div>
      )}
      {isMyPage && (
        <div className="my-page-wrapper">
          <Header />
          <MyPage />
        </div>
      )}
      {!isWritingPage && !isMyPage && (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      )}
      {isWritingPage && <Routes><Route path="/writing" element={null} /></Routes>}
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
