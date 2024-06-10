import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import ErrorBoundary from './components/Error/ErrorBoundary';

export default function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/Home" element={<HomePage />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}
