// src/pages/WritingPage.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import {
  saveDocument,
  getFinalEvaluation,
  getDocument,
  requestSentenceFeedback,
} from "../api/writing";
import "./WritingPage.css";
import "../components/Background.css";

const WritingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { docId } = useParams(); // /documents/:docId
  const stateData = location.state || {};

  const textareaRef = useRef(null);

  // 로딩/에러 상태
  const [loading, setLoading] = useState(!!docId);
  const [error, setError] = useState(null);

  // 문서 기본 정보
  const [documentId, setDocumentId] = useState(
    stateData.documentId || docId || null
  );
  const [category, setCategory] = useState(stateData.category || "essay");
  const [title, setTitle] = useState(stateData.title || "제목");
  const [content, setContent] = useState(stateData.content || "");

  // 키워드 (선택)
  const [keywords, setKeywords] = useState(stateData.keywords || []);

  // 피드백 관련 상태
  const [feedbackType, setFeedbackType] = useState("sentence"); // 'sentence' | 'structure'
  const [sentenceFeedback, setSentenceFeedback] = useState([]);
  const [structureFeedback, setStructureFeedback] = useState([]);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);

  // 최종 평가
  const [finalEvaluation, setFinalEvaluation] = useState("");
  const [showFinalEvaluation, setShowFinalEvaluation] = useState(false);

  // 단어 수
  const [wordCount, setWordCount] = useState(0);

  // 카테고리 이름 매핑
  const getCategoryName = categoryId => {
    const categoryMap = {
      resume: "RESUME",
      RESUME: "Resume",
      report: "Report",
      REPORT: "Report",
      essay: "Essay",
      ESSAY: "Essay",
      "cover-letter": "Cover Letter",
      COVER_LETTER: "Cover Letter",
    };
    return categoryMap[categoryId] || "Essay";
  };

  const documentType = getCategoryName(category);

  // 배경 그라데이션 클래스
  useEffect(() => {
    document.body.classList.add("gradient-body");
    return () => {
      document.body.classList.remove("gradient-body");
    };
  }, []);

  // 문서 조회
  useEffect(() => {
    const fetchDocument = async () => {
      if (!docId) return;

      try {
        setLoading(true);
        setError(null);

        const res = await getDocument(docId);
        const payload = res.data || res;

        setTitle(payload.title || "제목");
        setContent(payload.content || "");
        setCategory(payload.category || category);
        setDocumentId(payload.doc_id || payload.documentId || docId);
      } catch (e) {
        console.error("문서 불러오기 오류:", e);
        setError("문서를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docId]);

  // 단어 수 계산
  useEffect(() => {
    const words = content
      .trim()
      .split(/\s+/)
      .filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  // 제목 편집
  const handleTitleFocus = e => {
    if (e.target.textContent === "제목") {
      e.target.textContent = "";
    }
  };

  const handleTitleBlur = e => {
    if (e.target.textContent.trim() === "") {
      e.target.textContent = "제목";
    }
    setTitle(e.target.textContent);
  };

  // 내용 입력
  const handleContentChange = e => {
    setContent(e.target.value);
    if (showFinalEvaluation) {
      setShowFinalEvaluation(false);
    }
  };

  const handleContentKeyDown = e => {
    if (showFinalEvaluation) {
      setShowFinalEvaluation(false);
    }
  };

  // 피드백 타입 변경
  const handleFeedbackTypeChange = type => {
    setFeedbackType(type);
    setShowFinalEvaluation(false);
  };

  // 피드백 요청
  const handleRequestFeedback = async () => {
    if (!content.trim()) {
      alert("피드백을 받을 내용이 없습니다.");
      return;
    }

    if (!documentId) {
      alert("먼저 글을 저장한 뒤 피드백을 요청해 주세요.");
      return;
    }

    setIsLoadingFeedback(true);

    try {
      const requestType = feedbackType === "sentence" ? 1 : 0;

      const res = await requestSentenceFeedback({
        doc_id: documentId,
        category: (category || "ESSAY").toUpperCase(), // REPORT / ESSAY / COVER_LETTER ...
        keywords,
        description: stateData.description || stateData.topicDescription || "",
        request_type: requestType,
        user_text: content,
      });

      if (!res?.success) {
        throw new Error(res?.error || "피드백 요청 실패");
      }

      const payload = res.data || {};
      let feedbackList = payload.feedback || [];

      // 문자열로 올 수 있는 경우 방어
      if (!Array.isArray(feedbackList)) {
        if (typeof feedbackList === "string") {
          feedbackList = feedbackList
            .split("\n")
            .map(s => s.trim())
            .filter(Boolean);
        } else {
          feedbackList = [];
        }
      }

      if (feedbackType === "sentence") {
        setSentenceFeedback(feedbackList);
      } else {
        setStructureFeedback(feedbackList);
      }

      setShowFinalEvaluation(false);
    } catch (error) {
      console.error("피드백 요청 오류:", error);
      alert("피드백 요청에 실패했습니다.");
      setSentenceFeedback([]);
      setStructureFeedback([]);
    } finally {
      setIsLoadingFeedback(false);
    }
  };

  // 저장 + 최종 평가
  const handleSave = async () => {
    try {
      const res = await saveDocument({
        documentId,
        title: title === "제목" ? "" : title,
        content,
        category,
        keywords,
        description: stateData.description || stateData.topicDescription || "",
      });

      const payload = res.data || res;

      // 서버에서 새 documentId를 줄 수도 있음
      const newDocId = payload.doc_id || payload.documentId || documentId;
      setDocumentId(newDocId);

      setFeedbackType("sentence");
      setFinalEvaluation(payload.eval || "");
      setShowFinalEvaluation(true);

      alert("저장되었습니다.");
    } catch (error) {
      console.error("저장 오류:", error);
      alert("저장에 실패했습니다.");
    }
  };

  if (loading) {
    return <div className="writing-page">문서를 불러오는 중입니다...</div>;
  }

  if (error) {
    return <div className="writing-page">{error}</div>;
  }

  return (
    <div className="writing-page">
      <div className="writing-container">
        <div className="writing-content-wrapper">
          {/* Left - 글 작성 영역 */}
          <div className="writing-area">
            <div className="category-display">{documentType}</div>

            <div
              className="title-input"
              contentEditable
              suppressContentEditableWarning
              onFocus={handleTitleFocus}
              onBlur={handleTitleBlur}
              data-placeholder="제목"
            >
              {title}
            </div>

            <textarea
              ref={textareaRef}
              className="content-input"
              value={content}
              onChange={handleContentChange}
              onKeyDown={handleContentKeyDown}
              placeholder=""
            />

            <div className="word-count">{wordCount} words</div>

            <button
              className="feedback-request-button"
              onClick={handleRequestFeedback}
              disabled={isLoadingFeedback || !content.trim()}
            >
              {isLoadingFeedback ? "피드백 요청 중..." : "피드백 요청"}
            </button>
          </div>

          {/* Right - 피드백 영역 */}
          <div className="feedback-area">
            <div className="feedback-header">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="coach-icon"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                <circle cx="9" cy="10" r="1" fill="currentColor"></circle>
                <circle cx="15" cy="10" r="1" fill="currentColor"></circle>
              </svg>
              <h2>Writing Coach</h2>
            </div>

            <div className="feedback-type-buttons">
              <button
                className={`feedback-btn ${
                  feedbackType === "sentence" ? "active" : ""
                }`}
                onClick={() => handleFeedbackTypeChange("sentence")}
              >
                피드백
              </button>
              <button
                className={`feedback-btn ${
                  feedbackType === "structure" ? "active" : ""
                }`}
                onClick={() => handleFeedbackTypeChange("structure")}
              >
                개요
              </button>
            </div>

            <div className="feedback-content">
              {showFinalEvaluation ? (
                <div className="final-evaluation">
                  <div className="feedback-label">최종 평가:</div>
                  <div className="feedback-text">
                    {finalEvaluation || "최종 평가를 불러오는 중..."}
                  </div>
                </div>
              ) : feedbackType === "sentence" ? (
                <div className="sentence-feedback">
                  {sentenceFeedback.length > 0 ? (
                    <>
                      <div className="feedback-label">개선 제안:</div>
                      <ul className="feedback-list">
                        {sentenceFeedback.map((item, index) => (
                          <li key={index} className="feedback-item">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  ) : (
                    <div className="empty-feedback">
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="lightbulb-icon"
                      >
                        <path d="M9 21h6"></path>
                        <path d="M12 3a6 6 0 0 0-6 6c0 2.5 1.5 4.5 3 6l3 3 3-3c1.5-1.5 3-3.5 3-6a6 6 0 0 0-6-6z"></path>
                      </svg>
                      <p>피드백을 받고 싶은 내용을 작성한 후</p>
                      <p>왼쪽의 "피드백 요청" 버튼을 눌러주세요.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="structure-feedback">
                  {structureFeedback.length > 0 ? (
                    <div className="structure-sections">
                      {structureFeedback.map((text, index) => (
                        <div key={index} className="structure-section">
                          <div className="structure-section-title">
                            #{index + 1}
                          </div>
                          <div className="structure-section-feedback">
                            {text}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-feedback">
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="lightbulb-icon"
                      >
                        <path d="M9 21h6"></path>
                        <path d="M12 3a6 6 0 0 0-6 6c0 2.5 1.5 4.5 3 6l3 3 3-3c1.5-1.5 3-3.5 3-6a6 6 0 0 0-6-6z"></path>
                      </svg>
                      <p>개요 피드백을 받으려면</p>
                      <p>상단에서 "개요" 탭을 선택한 뒤 피드백을 요청해 주세요.</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="save-button-container">
              <button className="save-button" onClick={handleSave}>
                저장
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingPage;
