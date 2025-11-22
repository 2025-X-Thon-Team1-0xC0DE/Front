const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

/**
 * 회원가입 API
 * @param {Object} userData - 회원가입 데이터
 * @param {string} userData.loginId - 사용자 ID
 * @param {string} userData.password - 비밀번호
 * @param {string} userData.name - 이름
 * @returns {Promise<Object>} API 응답 데이터
 */
export const signup = async (userData) => {
  try {
    const url = `${API_BASE_URL}/api/signup`;
    const requestBody = {
      loginId: userData.loginId,
      password: userData.password,
      name: userData.name,
    };
    console.log('Signup request body:', requestBody);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    console.log(response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || '회원가입에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
};

/**
 * 로그인 API
 * @param {Object} credentials - 로그인 데이터
 * @param {string} credentials.loginId - 사용자 ID
 * @param {string} credentials.password - 비밀번호
 * @returns {Promise<Object>} API 응답 데이터
 */
export const login = async (credentials) => {
  try {
    const url = `${API_BASE_URL}/api/signin`;
    const requestBody = {
      loginId: credentials.loginId,
      password: credentials.password,
    };
    console.log('Login request URL:', url);
    console.log('Login request body:', requestBody);
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || '로그인에 실패했습니다.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Login error:', error);
    if (error.message === 'Failed to fetch' || error.name === 'TypeError') {
      throw new Error(`서버에 연결할 수 없습니다. 백엔드 서버(${API_BASE_URL})가 실행 중인지 확인해주세요.`);
    }
    throw error;
  }
};

