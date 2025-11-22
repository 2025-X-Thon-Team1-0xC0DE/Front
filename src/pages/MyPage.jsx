import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMyDocuments } from "../api/writing";
import "./MyPage.css";
import "../components/Background.css";

const MyPage = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 그라데이션 배경 유지
  useEffect(() => {
    document.body.classList.add("gradient-body");
    return () => {
      document.body.classList.remove("gradient-body");
    };
  }, []);

  const categories = [
    { id: "REPORT", title: "Report", color: "#4CAF50" },
    { id: "ESSAY", title: "Essay", color: "#FFC107" },
    { id: "RESUME", title: "Resume", color: "#2196F3" },
    { id: "COVER_LETTER", title: "Cover Letter", color: "#F44336" },
  ];

  useEffect(() => {
    loadDocuments();
  }, []);

  /** 🔥 MyPage 데이터 불러오기 (토큰 포함) */
  const loadDocuments = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("access_token");

      if (!token) {
        setError("로그인이 필요합니다.");
        setLoading(false);
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/documents`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("문서 목록 조회 실패");
      }

      const res = await response.json();

      // 응답 = { success: true, data: [...], error: null }
      const rawList = res.data || [];

      const normalized = rawList.map((doc) => {
        return {
          id: doc.doc_id,
          title: doc.title,
          category: doc.category, // REPORT / ESSAY ...
          createdAt: doc.created_at || null,
        };
      });

      setDocuments(normalized);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("문서 정보를 불러오는 중 오류가 발생했습니다.");
      setLoading(false);
    }
  };

  const handleDocumentClick = (documentId) => {
    navigate(`/documents/${documentId}`);
  };

  const getDocumentsByCategory = (categoryId) => {
    return documents.filter((doc) => doc.category === categoryId);
  };

  if (loading) {
    return <div className="loading">불러오는 중...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="my-page">
      <main className="my-page-content">
        <div className="page-title">
          <h1>내가 작성한 글</h1>
          <p>카테고리별로 분류된 글 목록입니다</p>
        </div>

        <div className="documents-container">
          {categories.map((category) => {
            const categoryDocuments = getDocumentsByCategory(category.id);

            return (
              <section key={category.id} className="category-section">
                <div className="category-header">
                  <div
                    className="category-indicator"
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <h2 className="category-title">{category.title}</h2>
                  <span className="document-count">
                    ({categoryDocuments.length})
                  </span>
                </div>

                {categoryDocuments.length > 0 ? (
                  <div className="documents-list">
                    {categoryDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="document-item"
                        onClick={() => handleDocumentClick(doc.id)}
                      >
                        <div className="document-title">{doc.title}</div>
                        <div className="document-meta">
                          {doc.createdAt && (
                            <span className="document-date">
                              {new Date(doc.createdAt).toLocaleDateString(
                                "ko-KR"
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-category">
                    <p>작성한 글이 없습니다</p>
                  </div>
                )}
              </section>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default MyPage;
