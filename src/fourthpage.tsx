import React, { useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import './fourthpage.css';

const FourthPage: React.FC = () => {
  const { teamName, batterName } = useParams<{ teamName: string; batterName: string }>(); // Extract teamName and batterName from URL params
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption) {
      // Navigate to FifthPage with the teamName, batterName, and situationOption
      navigate(`/fifthpage/${teamName}/${batterName}`, {
        state: { selectedTeam: teamName, batterName, situationOption: selectedOption }, // Pass data to FifthPage
      });
    } else {
      alert('옵션을 선택하세요');
    }
  };

  return (
    <div className="fourth-page">
      <h1>{teamName} 팀이 원하는 상황을 선택하세요.</h1> {/* Display team and batter */}
      <h1>
      <span className="batter-name">Batter Up : {batterName}</span>
      </h1>
      <form>
        <div className="option">
          <input
            type="radio"
            id="ere"
            name="option"
            value="eRE"
            checked={selectedOption === 'eRE'}
            onChange={() => handleOptionChange('eRE')}
          />
          <label htmlFor="ere">LOWEST e&Delta;RE</label>
        </div>
        <div className="option">
          <input
            type="radio"
            id="groundball"
            name="option"
            value="groundball"
            checked={selectedOption === 'groundball'}
            onChange={() => handleOptionChange('groundball')}
          />
          <label htmlFor="groundball">땅볼 유도 상황</label>
        </div>
        <div className="option">
          <input
            type="radio"
            id="strikeout"
            name="option"
            value="strikeout"
            checked={selectedOption === 'strikeout'}
            onChange={() => handleOptionChange('strikeout')}
          />
          <label htmlFor="strikeout">삼진 유도 상황</label>
        </div>
        <button type="button" onClick={handleSubmit}>
          다음으로
        </button>
      </form>
      {/* Pass teamName back to ThirdPage when going back */}
      <Link to={`/thirdpage/${teamName}`}>
        <button>뒤로 가기</button>
      </Link>
    </div>
  );
};

export default FourthPage;
