import { useEffect } from 'react'
import './Login.css'
import '../components/Background.css'

const Login = () => {
  // 페이지 진입 시 body에 그라데이션 배경 적용
  useEffect(() => {
    document.body.classList.add('gradient-body');
    
    return () => {
      document.body.classList.remove('gradient-body');
    };
  }, []);

  return (
    <div className="login-page">
      <h1>Login Page</h1>
      <p>로그인 페이지입니다.</p>
    </div>
  )
}

export default Login

