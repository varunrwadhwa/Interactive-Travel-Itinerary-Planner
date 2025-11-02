import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import TripCreationForm from './src/tripCreationForm';
import ItineraryBuilder from './src/ItineraryBuilder'; // <-- add this import

const cities = [
  { name: 'Tokyo', x: '15%', y: '20%' },
  { name: 'Paris', x: '80%', y: '10%' },
  { name: 'New York', x: '60%', y: '30%' }
];

const HeroPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div id="main-container">
      {/* Background Layer */}
      <div className="map-background"></div>

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="welcome-heading">Welcome to TripMate</h1>

        {/* Introductory Message */}
        <div className="cta-container">
          <p className="intro-text">
            🌍 Your Next Adventure Starts Here 🌏
            <br />
            Let AI craft your perfect journey. Spend less time planning
            and more time <i>experiencing</i> the world.
            <br />
            <span className="highlight-text">
              Start your stress-free travel planning in just one click!
            </span>
          </p>

          {/* CTA Button */}
          <button onClick={() => navigate('/create')} className="cta-button">
            Start Planning Now →
          </button>
        </div>

        {/* City Pins */}
        {cities.map((city) => (
          <span
            key={city.name}
            className="city-pin"
            style={{ left: city.x, top: city.y }}
          >
            📍
          </span>
        ))}

        {/* Airplanes */}
        <div className="airplane" style={{ top: '15%' }}>🛫</div>
        <div className="airplane" style={{ top: '35%', animationDelay: '2s' }}>🛫</div>
        <div className="airplane" style={{ top: '70%', animationDelay: '5s' }}>🛫</div>

        {/* Clouds */}
        <div className="cloud" style={{ left: '10%' }}>☁️</div>
        <div className="cloud" style={{ left: '50%', animationDelay: '3s' }}>☁️</div>
        <div className="cloud" style={{ left: '80%', animationDelay: '7s' }}>☁️</div>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <h1 className="header-text">Plan Smarter, Travel Better with TripMate</h1>
        <p className="paragraph-text">
          🚀 Your Ultimate Travel Companion 🚀
          <br />
          TripMate makes itinerary planning effortless, ensuring you never miss a moment of your journey. Whether you're a solo traveler, a couple on a getaway, or a group exploring together, TripMate helps you organize every detail seamlessly.
          <br />
          ✅ Smart Itinerary Planning - Create, customize, and adjust your travel plans on the go.
          <br />
          ✅ Real-Time Updates - Stay updated with live changes and recommendations.
          <br />
          ✅ Seamless Collaboration - Plan trips with friends and family in real-time.
          <br />
          ✅ AI-Powered Recommendations - Get the best places to visit, eat, and explore.
          <br />
          ✅ Offline Access - Your plans are always available, even without the internet.
          <br />
          With TripMate, your journey is smooth, well-planned, and stress-free. Say goodbye to messy travel notes and last-minute confusion—TripMate ensures a reliable, hassle-free, and fun travel experience.
        </p>
        <b>🌍 Wherever You Go, TripMate Has You Covered! 🌍</b>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} TripMate — Plan Smarter, Travel Better 🌍</p>
      </footer>

      {/* Scroll to Top Button */}
      <button
        className="scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        ↑
      </button>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/create" element={<TripCreationForm />} />
        <Route path="/itinerary" element={<ItineraryBuilder />} /> {/* <-- new route */}
      </Routes>
    </Router>
  );
};

export default App;
