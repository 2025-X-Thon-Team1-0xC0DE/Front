// 글 작성 API 함수들

import { getAccessToken } from './auth.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * 새 글 작성 요청 (카테고리 선택 후)
 * @param {Object} data - 글 작성 요청 데이터
 * @param {string} data.category - 카테고리 (resume, report, essay, cover-letter)
 * @param {string} data.title - 제목
 * @param {Array} data.keywords - 키워드 배열
 * @param {string} data.topicDescription - 주제 설명
 * @returns {Promise<Object>} - 글 작성 응답 (documentId 등)
 */
export const createNewDocument = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/documents`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category: data.category,
        title: data.title,
        keywords: data.keywords,
        topicDescription: data.topicDescription,
      }),
    });

    if (!response.ok) {
      throw new Error('글 작성 요청 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('글 작성 요청 오류:', error);
    throw error;
  }
};

/**
 * 기존 글 불러오기 요청 (마이페이지에서 제목 클릭 시)
 * @param {string} documentId - 문서 ID
 * @returns {Promise<Object>} - 글 데이터 (title, content, category 등)
 */
export const getDocument = async (documentId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/documents/${documentId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('글 불러오기 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('글 불러오기 오류:', error);
    throw error;
  }
};

/**
 * 내가 작성한 글 목록 가져오기
 * @returns {Promise<Array>} - 글 목록 배열
 */
export const getMyDocuments = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/documents/my-documents`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('글 목록 불러오기 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('글 목록 불러오기 오류:', error);
    throw error;
  }
};

/**
 * 글 저장 요청
 * @param {Object} data - 저장할 글 데이터
 * @param {string} data.documentId - 문서 ID (기존 문서인 경우)
 * @param {string} data.title - 제목
 * @param {string} data.content - 내용
 * @param {string} data.category - 카테고리
 * @returns {Promise<Object>} - 저장 응답
 */
export const saveDocument = async (data) => {
  try {
    const url = data.documentId 
      ? `${API_BASE_URL}/api/documents/${data.documentId}`
      : `${API_BASE_URL}/api/documents/`;
    
    const method = 'PATCH';
    
    const accessToken = getAccessToken();
    const headers = {
      'Content-Type': 'application/json',
    };
    
    // accessToken이 있으면 Authorization 헤더에 추가
    if (accessToken) {
      console.log('accessToken added to headers:', accessToken);
      headers['Authorization'] = `Bearer ${accessToken}`;
    }
    
    const response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify({
        category: data.category,
        keywords: data.keywords,
        description: data.description,
        content: data.content,
      }),
    });

    if (!response.ok) {
      throw new Error('글 저장 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('글 저장 오류:', error);
    throw error;
  }
};

/**
 * 최종 평가 요청
 * @param {Object} data - 평가 요청 데이터
 * @param {string} data.documentId - 문서 ID
 * @param {string} data.title - 제목
 * @param {string} data.content - 내용
 * @param {string} data.category - 카테고리
 * @returns {Promise<Object>} - 최종 평가 응답
 */
export const getFinalEvaluation = async (data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/documents/final-evaluation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        documentId: data.documentId,
        title: data.title,
        content: data.content,
        category: data.category,
      }),
    });

    if (!response.ok) {
      throw new Error('최종 평가 요청 실패');
    }

    return await response.json();
  } catch (error) {
    console.error('최종 평가 요청 오류:', error);
    throw error;
  }
};

