import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';
import { signup } from '../api/auth.js';

function Signup() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const isPasswordMismatch = confirmPassword && password !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 입력값 검증
    if (!name || !id || !password) {
      setError('모든 필드를 입력해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await signup({
        loginId: id,
        password: password,
        name: name,
      });
      
      console.log(response);
      if (response.success) {
        alert('회원가입이 완료되었습니다!');
        navigate('/');
      } else {
        setError(response.error || '회원가입에 실패했습니다.');
      }
    } catch (err) {
      setError(err.message || '회원가입 중 오류가 발생했습니다.');
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
            <h2 className="section-title">회원가입</h2>
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  이름
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="이름을 입력하세요"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

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

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="form-input"
                  placeholder="비밀번호를 다시 입력하세요"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {isPasswordMismatch && (
                  <span className="error-message">입력하신 비밀번호가 다릅니다</span>
                )}
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
                {isLoading ? '처리 중...' : '회원가입'}
              </button>
            </form>
            <div className="auth-link">
              <p>이미 계정이 있으신가요? <Link to="/">로그인</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;

