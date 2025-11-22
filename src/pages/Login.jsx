import { useState } from 'react';
import './Login.css';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 구현
    console.log('Login attempt:', { id, password });
  };

  return (
    <div className="login-container">
      {/* Main Content */}
      <div className="login-main">
        <div className="login-instruction">
          <h1 className="login-title">gAIde</h1>
          <p className="login-subtitle">당신이 쓴 문장에 AI의 손길을 더해주는 글 첨삭 파트너</p>
        </div>

        <div className="login-content">
          <div className="login-form-section">
            <h2 className="section-title">로그인</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
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

              <button type="submit" className="login-button">
                LogIn
              </button>
            </form>
            <div className="signup-link">
              <p>계정이 없으신가요? <a href="#">회원가입</a></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

