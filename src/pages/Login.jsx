import { useState } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 로그인 로직 구현
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="login-container">
      {/* Header */}
      <header className="login-header">
        <div className="brand-name">gAlde</div>
        <div className="profile-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </header>

      {/* Main Content */}
      <div className="login-main">
        <div className="login-instruction">
          <h1 className="login-title">로그인하세요</h1>
          <p className="login-subtitle">이메일과 비밀번호를 입력하여 계정에 접속하세요</p>
        </div>

        <div className="login-content">
          {/* Left Section: Login Form */}
          <div className="login-form-section">
            <h2 className="section-title">로그인 정보</h2>
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  이메일 *
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="이메일 주소를 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  비밀번호 *
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

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" className="checkbox-input" />
                  <span>로그인 상태 유지</span>
                </label>
                <a href="#" className="forgot-password">비밀번호 찾기</a>
              </div>

              <button type="submit" className="login-button">
                로그인하기 →
              </button>
            </form>
          </div>

          {/* Right Section: Welcome Message */}
          <div className="login-info-section">
            <h2 className="section-title">
              <span className="sparkle-icon">✨</span>
              환영합니다
            </h2>
            <div className="info-content">
              <div className="info-card">
                <h3>간편한 문서 작성</h3>
                <p>AI 기반 문서 생성 도구로 빠르고 효율적으로 문서를 작성하세요</p>
              </div>
              <div className="info-card">
                <h3>다양한 템플릿</h3>
                <p>이력서, 보고서, 에세이, 자기소개서 등 다양한 문서 형식을 지원합니다</p>
              </div>
              <div className="info-card">
                <h3>안전한 보관</h3>
                <p>작성한 문서를 안전하게 보관하고 언제든지 수정할 수 있습니다</p>
              </div>
            </div>
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

