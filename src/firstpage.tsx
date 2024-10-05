import React from 'react';
import './firstpage.css'; // CSS file import
import { Link } from 'react-router-dom';

const FirstPage = () => {
  return (
    <div className="container">
      <div className="left-side">
        <img src="/ysalImage.png" alt="YSAL" className="ysal-logo" /> {/* Access the image from the public folder */}
        <div>x</div>
        <div>
          sports<span className="highlight">2i</span> {/* Make "2i" red */}
        </div>
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