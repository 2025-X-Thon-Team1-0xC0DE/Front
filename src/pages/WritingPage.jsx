import { useState, useRef, useEffect } from 'react';
import './WritingPage.css';

const WritingPage = ({ documentType = 'Essay' }) => {
  const [title, setTitle] = useState('제목');
  const [content, setContent] = useState('안녕하세여 이재혁입니다');
  const [feedbackType, setFeedbackType] = useState('sentence'); // 'sentence' or 'structure'
  const [sentenceFeedback, setSentenceFeedback] = useState('');
  const [structureFeedback, setStructureFeedback] = useState({
    introduction: '', // 서론 피드백
    body: '', // 본론 피드백
    conclusion: '' // 결론 피드백
  });
  const [wordCount, setWordCount] = useState(0);
  const textareaRef = useRef(null);

  // 단어 수 계산
  useEffect(() => {
    const words = content.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
  }, [content]);

  // textarea 입력 처리
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  // 문장 단위 피드백 (최근 문장 추출)
  const getLastSentenceInfo = () => {
    if (!content.trim()) return null;
    
    // 문장 구분자로 분리 (마침표, 느낌표, 물음표)
    const sentenceRegex = /([^.!?]+[.!?]+)/g;
    const matches = [...content.matchAll(sentenceRegex)];
    
    if (matches.length === 0) {
      // 문장 구분자가 없으면 전체 텍스트를 하나의 문장으로 간주
      return {
        text: content.trim(),
        startIndex: 0,
        endIndex: content.length
      };
    }
    
    const lastMatch = matches[matches.length - 1];
    return {
      text: lastMatch[0].trim(),
      startIndex: lastMatch.index,
      endIndex: lastMatch.index + lastMatch[0].length
    };
  };

  const lastSentenceInfo = getLastSentenceInfo();

  // 최근 문장 텍스트 가져오기
  const getLastSentenceText = () => {
    if (!lastSentenceInfo) return '';
    return lastSentenceInfo.text;
  };

  // 피드백 타입 변경
  const handleFeedbackTypeChange = (type) => {
    setFeedbackType(type);
  };

  // 제목 포커스 처리
  const handleTitleFocus = (e) => {
    if (e.target.textContent === '제목') {
      e.target.textContent = '';
    }
  };

  const handleTitleBlur = (e) => {
    if (e.target.textContent.trim() === '') {
      e.target.textContent = '제목';
    }
    setTitle(e.target.textContent);
  };

  return (
    <div className="writing-page">
      {/* Header */}
      <header className="writing-header">
        <div className="header-left">
          <h1 className="logo">gAIde</h1>
        </div>
        <div className="header-center">
          <div className="document-type-badge">
            {documentType}
          </div>
        </div>
        <div className="header-right">
          <button className="save-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Save
          </button>
          <button className="icon-btn profile-btn" aria-label="Profile">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="writing-container">
        {/* Left Panel - Writing Area */}
        <div className="writing-area">
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
            placeholder=""
          />
          <div className="word-count">{wordCount} words</div>
        </div>

        {/* Right Panel - Feedback Area */}
        <div className="feedback-area">
          <div className="feedback-header">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="star-icon">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <h2>Writing Coach</h2>
          </div>

          {/* Feedback Type Buttons */}
          <div className="feedback-type-buttons">
            <button
              className={`feedback-btn ${feedbackType === 'sentence' ? 'active' : ''}`}
              onClick={() => handleFeedbackTypeChange('sentence')}
            >
              문장 피드백
            </button>
            <button
              className={`feedback-btn ${feedbackType === 'structure' ? 'active' : ''}`}
              onClick={() => handleFeedbackTypeChange('structure')}
            >
              글의 구조
            </button>
          </div>

          {/* Feedback Content */}
          <div className="feedback-content">
            {feedbackType === 'sentence' ? (
              <div className="sentence-feedback">
                {content.trim() && lastSentenceInfo ? (
                  <div>
                    <div className="feedback-label">최근 문장:</div>
                    <div className="feedback-sentence">"{getLastSentenceText()}"</div>
                    <div className="feedback-label">개선 제안:</div>
                    <div className="feedback-text">
                      {sentenceFeedback || '문장을 작성하면 AI가 개선 방향을 제안해드립니다.'}
                    </div>
                  </div>
                ) : (
                  <div className="empty-feedback">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="lightbulb-icon">
                      <path d="M9 21h6"></path>
                      <path d="M12 3a6 6 0 0 0-6 6c0 2.5 1.5 4.5 3 6l3 3 3-3c1.5-1.5 3-3.5 3-6a6 6 0 0 0-6-6z"></path>
                    </svg>
                    <p>Write to receive feedback.</p>
                    <p>AI insights will appear here as you write.</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="structure-feedback">
                {content.trim() ? (
                  <div className="structure-sections">
                    {/* 서론 섹션 */}
                    <div className="structure-section">
                      <div className="structure-section-title">서론</div>
                      <div className="structure-section-feedback">
                        {structureFeedback.introduction || '서론에 대한 피드백이 여기에 표시됩니다.'}
                      </div>
                    </div>

                    {/* 본론 섹션 */}
                    <div className="structure-section">
                      <div className="structure-section-title">본론</div>
                      <div className="structure-section-feedback">
                        {structureFeedback.body || '본론에 대한 피드백이 여기에 표시됩니다.'}
                      </div>
                    </div>

                    {/* 결론 섹션 */}
                    <div className="structure-section">
                      <div className="structure-section-title">결론</div>
                      <div className="structure-section-feedback">
                        {structureFeedback.conclusion || '결론에 대한 피드백이 여기에 표시됩니다.'}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="empty-feedback">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="lightbulb-icon">
                      <path d="M9 21h6"></path>
                      <path d="M12 3a6 6 0 0 0-6 6c0 2.5 1.5 4.5 3 6l3 3 3-3c1.5-1.5 3-3.5 3-6a6 6 0 0 0-6-6z"></path>
                    </svg>
                    <p>Write to receive feedback.</p>
                    <p>AI insights will appear here as you write.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingPage;

