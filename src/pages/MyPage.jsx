import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyDocuments, getDocument } from '../api/writing';
import './MyPage.css';
import '../components/Background.css';

const MyPage = () => {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 페이지 진입 시 body에 그라데이션 배경 적용
  useEffect(() => {
    document.body.classList.add('gradient-body', 'my-page-body');
    
    return () => {
      document.body.classList.remove('gradient-body', 'my-page-body');
    };
  }, []);

  const categories = [
    { id: 'resume', title: 'Resume', color: '#2196F3' },
    { id: 'report', title: 'Report', color: '#4CAF50' },
    { id: 'essay', title: 'Essay', color: '#FFC107' },
    { id: 'cover-letter', title: 'Cover Letter', color: '#F44336' },
  ];

  useEffect(() => {
    loadDocuments();
  }, []);

  const loadDocuments = async () => {
    try {
      setLoading(true);
      // TODO: 실제 API 연동 시 주석 해제
      // const data = await getMyDocuments();
      // setDocuments(data);

      // 임시 더미 데이터 (API 연동 전까지)
      const dummyData = [
        { id: '1', title: '자기소개서 예시', category: 'cover-letter', createdAt: '2024-01-15' },
        { id: '2', title: '이력서 초안', category: 'resume', createdAt: '2024-01-14' },
        { id: '3', title: '프로젝트 보고서', category: 'report', createdAt: '2024-01-13' },
        { id: '4', title: '대학 입학 에세이', category: 'essay', createdAt: '2024-01-12' },
      ];
      setDocuments(dummyData);
      setLoading(false);
    } catch (err) {
      setError('글 목록을 불러오는데 실패했습니다.');
      setLoading(false);
    }
  };

  const handleDocumentClick = async (documentId) => {
    try {
      // 백엔드에 글 작성 요청 (기존 글 불러오기)
      const documentData = await getDocument(documentId);
      
      // 글 작성 화면으로 이동 (state로 데이터 전달)
      navigate('/writing', { state: documentData });
    } catch (err) {
      console.error('글 불러오기 오류:', err);
      alert('글을 불러오는데 실패했습니다.');
    }
  };

  const getDocumentsByCategory = (categoryId) => {
    return documents.filter((doc) => doc.category === categoryId);
  };

  const getCategoryInfo = (categoryId) => {
    return categories.find((cat) => cat.id === categoryId) || categories[0];
  };

  if (loading) {
    return (
      <div className="my-page">
        <div className="loading">로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-page">
        <div className="error">{error}</div>
      </div>
    );
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
                  <span className="document-count">({categoryDocuments.length})</span>
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
                              {new Date(doc.createdAt).toLocaleDateString('ko-KR')}
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

