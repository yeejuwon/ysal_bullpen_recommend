import React, { Component } from 'react';
import { Link, useParams } from 'react-router-dom';
import matchupData from './data/matchup_result.json';
import './thirdpage.css';

interface Matchup {
  batter_name: string;
}

interface AppState {
  batters: string[];
  searchField: string;
}

class ThirdPage extends Component<{ teamName: string }, AppState> {
  constructor(props: { teamName: string }) {
    super(props);

    // Unique list of batters from matchup data
    const batters = [...new Set((matchupData as Matchup[]).map((matchup) => matchup.batter_name))];

    this.state = {
      batters: batters.sort(),
      searchField: '',
    };
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchField: e.target.value });
  };

  render() {
    const { batters, searchField } = this.state;
    const { teamName } = this.props; // teamName is passed as a prop
    const filteredBatters = batters.filter((batter) =>
      batter.toLowerCase().includes(searchField.toLowerCase())
    );

    // Grouping batters by their first letter
    const groupedBatters = filteredBatters.reduce((acc: { [key: string]: string[] }, batter: string) => {
      const firstLetter = batter.charAt(0).toUpperCase();
      if (!acc[firstLetter]) {
        acc[firstLetter] = [];
      }
      acc[firstLetter].push(batter);
      return acc;
    }, {});

    return (
      <div className="App">
        <h1>{teamName}가 상대할 타자를 선택하세요.</h1>
        
        {/* Search input for players */}
        <input
          type="search"
          placeholder="Search Batter"
          onChange={this.handleChange}
        />
        
        {/* Move the back button below the search input and center align */}
        <div className="button-container">
          <Link to="/secondpage">
            <button className="back-button">뒤로 가기</button>
          </Link>
        </div>

        <div className="batter-list">
          {Object.keys(groupedBatters).sort().map((letter) => (
            <div key={letter} className="batter-group">
              <div className="batter-group-title">{letter}</div>
              <div className="batter-names">
                {groupedBatters[letter].map((batter, idx) => (
                  <div key={idx} className="batter-name">
                    {/* Pass both teamName and batter to FourthPage */}
                    <Link to={`/fourthpage/${teamName}/${batter}`}>
                      <button>{batter}</button>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

// Using URL parameters to get teamName
const ThirdPageWithParams: React.FC = () => {
  const { teamName } = useParams<{ teamName: string }>();
  return <ThirdPage teamName={teamName || 'Unknown Team'} />;
};

export default ThirdPageWithParams;
