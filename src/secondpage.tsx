import React, { Component } from 'react';
import teamsData from './data/smlbteams.json'; // JSON 파일에서 팀 데이터를 가져옴
import { Link } from 'react-router-dom';
import './secondpage.css';

// TypeScript 인터페이스 정의
interface Team {
  id: number;
  name: string;
}

interface AppState {
  teams: Team[];
  searchField: string;
  selectedTeamName: string; // 선택된 팀 이름 상태 추가
}

class SecondPage extends Component<{}, AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      teams: teamsData.sort((a, b) => a.name.localeCompare(b.name)),
      searchField: '',
      selectedTeamName: '', // 초기값 설정
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchField: e.target.value });
  };

  getLogoPath = (teamName: string) => {
    // 팀 이름과 일치하는 로고 반환
    const logos: { [key: string]: string } = {
      'Baltimore Orioles': '/mlblogos/baltimore_orioles.png',
      'Boston Red Sox': '/mlblogos/boston_red_sox.png',
      'New York Yankees': '/mlblogos/new_york_yankees.png',
      'Tampa Bay Rays': '/mlblogos/tampa_bay_rays.png',
      'Toronto Blue Jays': '/mlblogos/toronto_blue_jays.png',
      'Chicago White Sox': '/mlblogos/chicago_white_sox.png',
      'Cleveland Guardians': '/mlblogos/cleveland_guardians.png',
      'Detroit Tigers': '/mlblogos/detroit_tigers.png',
      'Kansas City Royals': '/mlblogos/kansas_city_royals.png',
      'Minnesota Twins': '/mlblogos/minnesota_twins.png',
      'Houston Astros': '/mlblogos/houston_astros.png',
      'Los Angeles Angels': '/mlblogos/los_angeles_angels.png',
      'Oakland Athletics': '/mlblogos/oakland_athletics.png',
      'Seattle Mariners': '/mlblogos/seattle_mariners.png',
      'Texas Rangers': '/mlblogos/texas_rangers.png',
      'Atlanta Braves': '/mlblogos/atlanta_braves.png',
      'Miami Marlins': '/mlblogos/miami_marlins.png',
      'New York Mets': '/mlblogos/new_york_mets.png',
      'Philadelphia Phillies': '/mlblogos/philadelphia_phillies.png',
      'Washington Nationals': '/mlblogos/washington_nationals.png',
      'Chicago Cubs': '/mlblogos/chicago_cubs.png',
      'Cincinnati Reds': '/mlblogos/cincinnati_reds.png',
      'Milwaukee Brewers': '/mlblogos/milwaukee_brewers.png',
      'Pittsburgh Pirates': '/mlblogos/pittsburgh_pirates.png',
      'St. Louis Cardinals': '/mlblogos/st_louis_cardinals.png',
      'Arizona Diamondbacks': '/mlblogos/arizona_diamondbacks.png',
      'Colorado Rockies': '/mlblogos/colorado_rockies.png',
      'Los Angeles Dodgers': '/mlblogos/los_angeles_dodgers.png',
      'San Diego Padres': '/mlblogos/san_diego_padres.png',
      'San Francisco Giants': '/mlblogos/san_francisco_giants.png',
    };

    return logos[teamName] || ''; // 로고가 없을 경우 빈 문자열 반환
  };

  render() {
    const { teams, searchField } = this.state;
    const filteredTeams = teams.filter((team) =>
      team.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className="App">
        <h1>투수의 팀을 선택하세요</h1>
        <input
          type="search"
          placeholder="Search Teams"
          onChange={this.handleChange}
        />
        <div className="team-grid">
          {filteredTeams.map((team) => (
            <div key={team.id} className="team-card">
              {/* 팀 로고를 불러옴 */}
              <img
                src={this.getLogoPath(team.name)} // public 폴더의 이미지 경로 사용
                alt={`${team.name} logo`}
                className="team-logo"
              />
              <div className="team-name">{team.name}</div>
              {/* 선택한 팀 이름을 ThirdPage로 전달 */}
              <Link to={`/thirdpage/${team.name}`}>
                <button>팀 선택</button>
              </Link>
            </div>
          ))}
        </div>
        {/* 뒤로 가기 버튼 */}
        <Link to="/">
          <button>뒤로 가기</button>
        </Link>
      </div>
    );
  }
}

export default SecondPage;