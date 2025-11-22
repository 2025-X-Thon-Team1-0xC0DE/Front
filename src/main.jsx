import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './main.css'

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [title, setTitle] = useState('')
  const [keywordInput, setKeywordInput] = useState('')
  const [keywords, setKeywords] = useState([])
  const [topicDescription, setTopicDescription] = useState('')

  const categories = [
    {
      id: 'resume',
      title: 'Resume',
      description: '경력과 역량을 효과적으로 전달하세요',
      icon: 'briefcase',
      bgColor: '#E3F2FD',
      iconColor: '#2196F3',
      selectedBorderColor: '#64B5F6',
      buttonColor: '#5C6BC0',
      buttonHoverColor: '#3F51B5'
    },
    {
      id: 'report',
      title: 'Report',
      description: '체계적인 보고서를 작성하세요',
      icon: 'document',
      bgColor: '#E8F5E9',
      iconColor: '#4CAF50',
      selectedBorderColor: '#81C784',
      buttonColor: '#43A047',
      buttonHoverColor: '#2E7D32'
    },
    {
      id: 'essay',
      title: 'Essay',
      description: '논리적인 에세이를 완성하세요',
      icon: 'graduation',
      bgColor: '#FFFDE7',
      iconColor: '#FFC107',
      selectedBorderColor: '#FFE082',
      buttonColor: '#E65100',
      buttonHoverColor: '#BF360C'
    },
    {
      id: 'cover-letter',
      title: 'Cover Letter',
      description: '인상적인 자기소개서를 만드세요',
      icon: 'envelope',
      bgColor: '#FCE4EC',
      iconColor: '#F44336',
      selectedBorderColor: '#EF5350',
      buttonColor: '#B71C1C',
      buttonHoverColor: '#8B0000'
    }
  ]

  const renderCategoryIcon = (iconType) => {
    switch (iconType) {
      case 'briefcase':
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        )
      case 'document':
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
        )
      case 'graduation':
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
            <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
          </svg>
        )
      case 'envelope':
        return (
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
            <polyline points="22,6 12,13 2,6"></polyline>
          </svg>
        )
      default:
        return null
    }
  }

  const handleAddKeyword = () => {
    if (keywordInput.trim() && keywords.length < 5) {
      setKeywords([...keywords, keywordInput.trim()])
      setKeywordInput('')
    }
  }

  const handleRemoveKeyword = (index) => {
    setKeywords(keywords.filter((_, i) => i !== index))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddKeyword()
    }
  }

  const handleSubmit = () => {
    console.log('제출:', {
      category: selectedCategory,
      title,
      keywords,
      topicDescription
    })
  }

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">gAIde</div>
        <div className="user-icon">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M20.59 22C20.59 18.13 16.74 15 12 15C7.26 15 3.41 18.13 3.41 22"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </header>

      <main className="main-content">
        <div className="page-title">
          <h1>무엇을 작성하고 싶으신가요?</h1>
          <p>카테고리를 선택하고 세부 정보를 입력하세요</p>
        </div>

        <div className="content-wrapper">
          <section className="category-section">
            <h2 className="section-title">카테고리 선택</h2>
            <div className="category-grid">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`category-card ${category.id} ${
                    selectedCategory === category.id ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                  style={{
                    '--category-bg-color': category.bgColor,
                    '--category-icon-color': category.iconColor,
                    '--category-selected-border': category.selectedBorderColor
                  }}
                >
                  <div className="category-icon" style={{ backgroundColor: category.bgColor }}>
                    <div style={{ color: category.iconColor }}>
                      {renderCategoryIcon(category.icon)}
                    </div>
                  </div>
                  <div className="category-title">{category.title}</div>
                  <div className="category-description">
                    {category.description}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="details-section">
            <div className="details-container">
              <div className="details-header">
                <span className="sparkle-icon">✨</span>
                <h2 className="section-title">세부 정보</h2>
              </div>

              <form className="details-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">
                  <span className="label-text">제목</span> <span className="required-asterisk">*</span>
                </label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="문서 제목을 입력하세요"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-text">키워드</span> <span className="label-hint">(최대 5개)</span>
                </label>
                <div className="keywords-input-wrapper">
                  <input
                    type="text"
                    className="form-input keywords-input"
                    placeholder="키워드 입력"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={keywords.length >= 5}
                  />
                  <button
                    type="button"
                    className="add-keyword-btn"
                    onClick={handleAddKeyword}
                    disabled={keywords.length >= 5 || !keywordInput.trim()}
                  >
                    +
                  </button>
                </div>
                {keywords.length > 0 && (
                  <div className="keywords-list">
                    {keywords.map((keyword, index) => (
                      <span key={index} className="keyword-tag">
                        {keyword}
                        <span
                          className="keyword-remove"
                          onClick={() => handleRemoveKeyword(index)}
                        >
                          ×
                        </span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <span className="label-text">주제 설명</span> <span className="label-hint">(선택)</span>
                </label>
                <textarea
                  className="form-textarea"
                  placeholder="작성할 내용에 대해 간단히 설명해주세요"
                  value={topicDescription}
                  onChange={(e) => setTopicDescription(e.target.value)}
                  rows="4"
                />
              </div>

              <button
                type="button"
                className={`submit-button ${!selectedCategory ? 'disabled' : ''}`}
                onClick={handleSubmit}
                disabled={!selectedCategory}
                style={selectedCategory ? {
                  '--button-color': categories.find(cat => cat.id === selectedCategory)?.buttonColor || '#5C6BC0',
                  '--button-hover-color': categories.find(cat => cat.id === selectedCategory)?.buttonHoverColor || '#3F51B5',
                  backgroundColor: 'var(--button-color)'
                } : {}}
              >
                작성 시작하기 <span className="arrow">→</span>
              </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
