import logo from './logo.svg';
import './App.css';
import NearCinemas from './components/near_cinemas';
import Cinema from './components/cinema';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router baseUrl="/">
        <Routes>
          <Route path="/" element={<NearCinemas />} />
          <Route path="/cinema/:owner/:internal_id/:cinema_name" element={<Cinema />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
