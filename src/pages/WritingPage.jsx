import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './WritingPage.css';
import '../components/Background.css';

const WritingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const documentData = location.state || null;
  
  // documentData가 있으면 기존 글 불러오기, 없으면 새 글
  const [title, setTitle] = useState(documentData?.title || '제목');
  const [content, setContent] = useState(documentData?.content || '');
  
  // 카테고리 이름 매핑
  const getCategoryName = (categoryId) => {
    const categoryMap = {
      'resume': 'Resume',
      'report': 'Report',
      'essay': 'Essay',
      'cover-letter': 'Cover Letter'
    }
    return categoryMap[categoryId] || 'Essay'
  }
  
  const documentType = getCategoryName(documentData?.category);
  const [feedbackType, setFeedbackType] = useState('sentence'); // 'sentence' or 'structure'
  const [sentenceFeedback, setSentenceFeedback] = useState('');
  const [structureFeedback, setStructureFeedback] = useState({
    introduction: '', // 서론 피드백
    body: '', // 본론 피드백
    conclusion: '' // 결론 피드백
  });
  const [wordCount, setWordCount] = useState(0);

  // 페이지 진입 시 body에 그라데이션 배경 적용
  useEffect(() => {
    document.body.classList.add('gradient-body');
    
    return () => {
      document.body.classList.remove('gradient-body');
    };
  }, []);
  const textareaRef = useRef(null);

  // documentData가 변경되면 제목과 내용 업데이트
  useEffect(() => {
    if (documentData) {
      setTitle(documentData.title || '제목');
      setContent(documentData.content || '');
    }
  }, [documentData]);

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

  // 저장 핸들러
  const handleSave = async () => {
    try {
      // TODO: 실제 API 연동 시 구현
      console.log('저장:', { title, content, category: documentData?.category });
      alert('저장되었습니다.');
    } catch (error) {
      console.error('저장 오류:', error);
      alert('저장에 실패했습니다.');
    }
  };

  return (
    <div className="writing-page">

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
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="coach-icon">
              {/* 말풍선 아이콘 - 코칭과 피드백을 상징 */}
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              {/* 말풍선 안의 작은 원들 - 대화를 상징 */}
              <circle cx="9" cy="10" r="1" fill="currentColor"></circle>
              <circle cx="15" cy="10" r="1" fill="currentColor"></circle>
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

          {/* Save Button */}
          <div className="save-button-container">
            <button className="save-button" onClick={handleSave}>
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WritingPage;

