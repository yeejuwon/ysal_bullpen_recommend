import React from 'react';
import './firstpage.css'; // CSS 파일 import
import { Link } from 'react-router-dom';

const FirstPage = () => {
  return (
    <div className="container">
      <div className="left-side">
        <div>YSAL</div>
        <div>x</div>
        <div>sports2i</div>
      </div>
      <div className="right-side">
        <div className="main-title">최적의 불펜 투수 제안</div>
        <Link to="/secondpage"> {/* Link to second page */}
          <button className="start-btn">시작하기</button>
        </Link>
      </div>
    </div>
  );
}

export default FirstPage;
