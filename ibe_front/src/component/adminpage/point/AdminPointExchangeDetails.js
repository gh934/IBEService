import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPointExchangeDetails.css';

const AdminPointExchangeDetails = () => {
  const [originalItems, setOriginalItems] = useState([]); // 원본 데이터 상태
  const [filteredItems, setFilteredItems] = useState([]); // 필터링된 데이터 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('memberName'); // 기본 검색 타입
  const [selectedStatus, setSelectedStatus] = useState(''); // 거래상태 필터
  const [selectedNotes, setSelectedNotes] = useState(''); // 비고 필터
  const itemsPerPage = 10;

  // 서버에서 데이터 가져오기
  useEffect(() => {
    const fetchPointData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/admin/point');
        const sortedData = response.data.sort(
          (a, b) => new Date(b.entryDate) - new Date(a.entryDate)
        ); // 지급일 기준 내림차순 정렬
        setOriginalItems(sortedData); // 원본 데이터 저장
        setFilteredItems(sortedData); // 필터링된 데이터 초기화
      } catch (error) {
        console.error('Error fetching point exchange data:', error);
      }
    };

    fetchPointData();
  }, []);

  // 조회 버튼 클릭 시 필터링
  const handleSearch = () => {
    const newFilteredItems = originalItems.filter((item) => {
      const valueToSearch =
        searchType === 'memberName' ? item.memberName : item.memberEmail;
      const matchesSearchTerm =
        valueToSearch &&
        valueToSearch.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = selectedStatus
        ? item.pointPayBackResult === selectedStatus
        : true;
      const matchesNotes = selectedNotes ? item.notes === selectedNotes : true;

      return matchesSearchTerm && matchesStatus && matchesNotes;
    });

    setFilteredItems(newFilteredItems);
    setCurrentPage(1); // 검색 후 첫 페이지로 이동
  };

  // Enter 키로 검색
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // 현재 페이지에 해당하는 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  // 페이지 버튼 생성
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const pageNumbers = [...Array(totalPages)].map((_, i) => i + 1);

  // 페이지 버튼 범위 설정
  const pageLimit = 10;
  const startIndex = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
  const endIndex = Math.min(startIndex + pageLimit, totalPages);
  const visiblePageNumbers = pageNumbers.slice(startIndex, endIndex);

  // 페이지 이동 함수들
  const goToNextPage = () => {
    const newPage = startIndex + pageLimit + 1;
    if (newPage <= totalPages) {
      setCurrentPage(newPage);
    } else {
      setCurrentPage(totalPages);
    }
  };

  const goToPreviousPage = () => {
    const newPage = startIndex - pageLimit + pageLimit;
    if (newPage >= 1) {
      setCurrentPage(newPage);
    } else {
      setCurrentPage(1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <>
      <h2 className="admin-ped-h2">포인트 관리 - 포인트 환전 내역</h2>

      <div className="admin-ped-content-box">
        <div className="admin-ped-search-container">
          <select
            value={searchType}
            onChange={(e) => {
              setSearchType(e.target.value);
              setSearchTerm('');
              setCurrentPage(1);
            }}
          >
            <option value="memberName">이름</option>
            <option value="memberEmail">이메일</option>
          </select>
          <input
            type="text"
            placeholder="검색어 입력"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown} // Enter 키 이벤트 추가
          />
          <button onClick={handleSearch}>조회</button>
        </div>
        <div className="admin-ped-point-exchange-table">
          <div className="admin-ped-point-exchange-row header">
            <div className="admin-ped-column nickname">이름</div>
            <div className="admin-ped-column email">이메일</div>
            <div className="admin-ped-column exchangePoints">환전포인트</div>
            <div className="admin-ped-column paymentAmount">지급금액</div>
            <div className="admin-ped-column bankInfo">은행정보</div>
            <div className="admin-ped-column paymentDate">지급일</div>
          </div>
          {currentItems.length > 0 ? (
            currentItems.map((item) => (
              <div
                className="admin-ped-point-exchange-row"
                key={item.pointPayBackId}
              >
                <div className="admin-ped-column nickname">
                  {item.memberName}
                </div>
                <div className="admin-ped-column email">{item.memberEmail}</div>
                <div className="admin-ped-column exchangePoints">
                  {item.pointPayBackPoint.toLocaleString()}P
                </div>
                <div className="admin-ped-column paymentAmount">
                  {item.pointPayBackPrice.toLocaleString()}원
                </div>
                <div className="admin-ped-column bankInfo">
                  {item.bankName} ({item.bankAccountNumber})
                </div>
                <div className="admin-ped-column paymentDate">
                  {(() => {
                    const date = new Date(item.entryDate);
                    const formattedDate = `${date.getFullYear()}. ${String(
                      date.getMonth() + 1
                    ).padStart(2, '0')}. ${String(date.getDate()).padStart(
                      2,
                      '0'
                    )}. ${String(date.getHours()).padStart(2, '0')}:${String(
                      date.getMinutes()
                    ).padStart(2, '0')}`;
                    return formattedDate;
                  })()}
                </div>
              </div>
            ))
          ) : (
            <div className="admin-ped-no-results">검색 결과가 없습니다.</div>
          )}
        </div>
        {filteredItems.length > itemsPerPage && (
          <div className="admin-ped-pagination">
            <button onClick={goToFirstPage} disabled={currentPage === 1}>
              {'<<'}
            </button>
            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              {'<'}
            </button>
            {visiblePageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={currentPage === number ? 'active' : ''}
              >
                {number}
              </button>
            ))}
            <button onClick={goToNextPage} disabled={currentPage >= totalPages}>
              {'>'}
            </button>
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
            >
              {'>>'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPointExchangeDetails;
