const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

/**
 * 회원가입 API
 * @param {Object} userData
 * @param {string} userData.loginId
 * @param {string} userData.password
 * @param {string} userData.name
 * @returns {Promise<Object>}
 */
export const signup = async (userData) => {
  try {
    const url = `${API_BASE_URL}/api/signup`;

    const requestBody = {
      loginId: userData.loginId,
      password: userData.password,
      name: userData.name,
    };

    console.log("Signup request body:", requestBody);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "회원가입에 실패했습니다.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

/**
 * 로그인 API
 * @param {Object} credentials
 * @param {string} credentials.loginId
 * @param {string} credentials.password
 * @returns {Promise<Object>}
 */
export const login = async (credentials) => {
  try {
    const url = `${API_BASE_URL}/api/signin`;

    const requestBody = {
      loginId: credentials.loginId,
      password: credentials.password,
    };

    console.log("Login request URL:", url);
    console.log("Login request body:", requestBody);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("response 값", response);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.log("errorData 값", errorData);
      throw new Error(errorData.error || "로그인에 실패했습니다.");
    }

    const res = await response.json();

    if (res.data.accessToken) {
      localStorage.setItem("access_token", res.data.accessToken);
      console.log("✔ access_token saved:", res.data.accessToken);
    } else {
      console.warn(
        "⚠ 로그인 응답에 accessToken이 없습니다.",
        res.data.accessToken
      );
    }

    return res;
  } catch (error) {
    console.error("Login error:", error);

    if (error.message === "Failed to fetch" || error.name === "TypeError") {
      throw new Error(
        `서버에 연결할 수 없습니다. 백엔드 서버(${API_BASE_URL})가 실행 중인지 확인해주세요.`
      );
    }

    throw error;
  }
};
