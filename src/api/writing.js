// 글 작성 API 함수들

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

/**
 * 새 글 작성 요청 (카테고리 선택 후)
 */
export const createNewDocument = async (data) => {
  try {
    const token = localStorage.getItem("access_token");
    console.log("📌 createNewDocument token:", token);

    const response = await fetch(`${API_BASE_URL}/api/documents`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        category: data.category, // 예: 'report'
        title: data.title,
        keywords: data.keywords,
        description: data.topicDescription || data.description, // 명세서: description
      }),
    });

    if (!response.ok) {
      throw new Error("글 작성 요청 실패");
    }

    return await response.json(); // { success, data: { doc_id: ... }, error }
  } catch (error) {
    console.error("글 작성 요청 오류:", error);
    throw error;
  }
};

/**
 * 기존 글 불러오기 요청 (docId 기준)
 */
export const getDocument = async (documentId) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `${API_BASE_URL}/api/documents/${documentId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("글 불러오기 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("글 불러오기 오류:", error);
    throw error;
  }
};

// 글 목록 조회 (마이페이지)
export const getMyDocuments = async () => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(`${API_BASE_URL}/api/documents`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("글 목록 불러오기 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("글 목록 불러오기 오류:", error);
    throw error;
  }
};

/**
 * 글 저장 요청
 */
export const saveDocument = async (data) => {
  try {
    const token = localStorage.getItem("access_token");
    const url = data.documentId
      ? `${API_BASE_URL}/api/documents/${data.documentId}`
      : `${API_BASE_URL}/api/documents`;

    const method = data.documentId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        title: data.title,
        content: data.content,
        category: data.category,
      }),
    });

    if (!response.ok) {
      throw new Error("글 저장 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("글 저장 오류:", error);
    throw error;
  }
};

/**
 * 최종 평가 요청
 */
export const getFinalEvaluation = async (data) => {
  try {
    const token = localStorage.getItem("access_token");
    const response = await fetch(
      `${API_BASE_URL}/api/documents/final-evaluation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          documentId: data.documentId,
          title: data.title,
          content: data.content,
          category: data.category,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("최종 평가 요청 실패");
    }

    return await response.json();
  } catch (error) {
    console.error("최종 평가 요청 오류:", error);
    throw error;
  }
};
