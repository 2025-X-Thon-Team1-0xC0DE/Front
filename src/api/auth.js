const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080';

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
    const response = await fetch(`${API_BASE_URL}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        loginId: userData.loginId,
        password: userData.password,
        name: userData.name,
      }),
    });

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

