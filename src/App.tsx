import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstPage from './firstpage';
import SecondPage from './secondpage';
import ThirdPage from './thirdpage';
import FourthPage from './fourthpage';
import FifthPage from './fifthpage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/secondpage" element={<SecondPage />} />
        <Route path="/thirdpage/:teamName" element={<ThirdPage />} />
        <Route path="/fourthpage/:teamName/:batterName" element={<FourthPage />} />
        {/* Update the route to include teamName and batterName */}
        <Route path="/fifthpage/:teamName/:batterName" element={<FifthPage />} />
      </Routes>
    </Router>
  );
};

export default App;
