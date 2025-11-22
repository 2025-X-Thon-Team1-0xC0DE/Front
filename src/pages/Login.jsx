import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { login } from '../api/auth.js';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 입력값 검증
    if (!id || !password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await login({
        loginId: id,
        password: password,
      });

      if (response.success) {
        alert('로그인에 성공했습니다!');
        navigate('/main');
      } else {
        setError(response.error || '로그인에 실패했습니다.');
      }
    } catch (err) {
      setError(err.message || '로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
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

              {error && (
                <div className="error-message" style={{ marginTop: '0.5rem' }}>
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                className="auth-button"
                disabled={isLoading}
              >
                {isLoading ? '처리 중...' : 'LogIn'}
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

