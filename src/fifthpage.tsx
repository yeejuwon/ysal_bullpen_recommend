import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import './fifthpage.css';
import eREData from './data/matchup_eRE.json';
import GBData from './data/matchup_GB.json';
import WHIFFData from './data/matchup_WHIFF.json';
import teamsData from './data/team_data.json';

// 매치업 데이터의 타입 정의
interface MatchupData {
  [teamAbbreviation: string]: {
    [batterName: string]: (string | number)[][];
  };
}

const FifthPage: React.FC = () => {
  const { teamName, batterName } = useParams<{ teamName: string; batterName: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  // state로 받은 선택한 상황 옵션 가져오기
  const situationOption = location.state?.situationOption || 'eRE';

  const [pitchers, setPitchers] = useState<(string | number)[][]>([]);

  // 팀 이름을 약어로 변환하는 함수
  const getTeamAbbreviation = (teamName: string): string => {
    const team = teamsData.find((t) => t.name === teamName);
    return team ? team.abbreviation : '';
  };

  useEffect(() => {
    let matchupData: MatchupData | undefined;

    // 상황에 따른 매치업 데이터 선택
    switch (situationOption) {
      case 'eRE':
        matchupData = eREData as MatchupData;
        break;
      case 'groundball':
        matchupData = GBData as MatchupData;
        break;
      case 'strikeout':
        matchupData = WHIFFData as MatchupData;
        break;
      default:
        matchupData = undefined;
        break;
    }

    const teamAbbreviation = getTeamAbbreviation(teamName || '');

    // 데이터가 유효한지 확인 후 투수 리스트 설정
    if (
      matchupData &&
      teamAbbreviation &&
      matchupData[teamAbbreviation] &&
      matchupData[teamAbbreviation][batterName || '']
    ) {
      setPitchers(matchupData[teamAbbreviation][batterName || '']);
    }
  }, [teamName, batterName, situationOption]);

  // 뒤로 가기 버튼 핸들러
  const handleBack = () => {
    navigate(`/fourthpage/${teamName}/${batterName}`, {
      state: { situationOption }, // 선택한 상황 옵션을 다시 전달
    });
  };

  return (
    <div className="fifthpage-container">
      <h1>
        최종 결과
        {situationOption === 'eRE' ? ' (eΔRE)' : ' (NN Distance)'}
      </h1>
      <div className="pitcher-list">
        {pitchers.length > 0 ? (
          pitchers.map((pitcher, index) => (
            <div className="pitcher-item" key={index}>
              <span className="pitcher-name">{pitcher[0]}</span>
              <span className="pitcher-value">{pitcher[1]}</span>
            </div>
          ))
        ) : (
          <p>선택한 팀과 타자에 대한 데이터가 없습니다.</p>
        )}
      </div>
  
      {/* 버튼을 감싸는 div 추가 */}
      <div className="button-container">
        <button className="back-button" onClick={handleBack}>
          뒤로 가기
        </button>
  
        <button className="home-button" onClick={() => navigate('/')}>
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
  
};

export default FifthPage;