import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 구현
    console.log('Login attempt:', { id, password });
  };

  return (
    <div className="auth-container">
      {/* Main Content */}
      <div className="auth-main">
        <div className="auth-instruction">
          <h1 className="auth-title">gAIde</h1>
          <p className="auth-subtitle">당신이 쓴 문장에 AI의 손길을 더해주는 글 첨삭 파트너</p>
        </div>

        <div className="auth-content">
          <div className="auth-form-section">
            <h2 className="section-title">로그인</h2>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="id" className="form-label">
                  ID
                </label>
                <input
                  type="text"
                  id="id"
                  className="form-input"
                  placeholder="ID를 입력하세요"
                  value={id}
                  onChange={(e) => setId(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  비밀번호
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="auth-button">
                LogIn
              </button>
            </form>
            <div className="auth-link">
              <p>계정이 없으신가요? <Link to="/signup">회원가입</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

