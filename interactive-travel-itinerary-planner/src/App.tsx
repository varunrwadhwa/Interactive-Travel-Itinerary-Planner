import './App.css'

const cities = [
  { name: 'Tokyo', x: '20%', y: '20%' },
  { name: 'Paris', x: '30%', y: '50%' },
  { name: 'New York', x: '60%', y: '30%' }
];

const App: React.FC = () => {
  return (
    <div id='main-container'>
      {/* Hero Section */} 
      <div className="hero-section">       {/* hero section position relative to create stacking context  */}
        <div className="map-background"></div>       {/* background image given position absolute */}
        <h1 className='welcome-heading'>Welcome to TripMate</h1>
      </div>

      {/* Content Section */}
      <div className="content-section">
        <h1 className='header-text'>Plan Smarter, Travel Better with TripMate</h1>
        <p className='paragraph-text'>
            🚀 Your Ultimate Travel Companion 🚀
            <br/>
            TripMate makes itinerary planning effortless, ensuring you never miss a moment of your journey. Whether you're a solo traveler, a couple on a getaway, or a group exploring together, TripMate helps you organize every detail seamlessly.
            <br/>
            ✅ Smart Itinerary Planning - Create, customize, and adjust your travel plans on the go.
            <br/>
            ✅ Real-Time Updates - Stay updated with live changes and recommendations.
            <br/>
            ✅ Seamless Collaboration - Plan trips with friends and family in real-time.
            <br/>
            ✅ AI-Powered Recommendations - Get the best places to visit, eat, and explore.
            <br/>
            ✅ Offline Access - Your plans are always available, even without the internet.
            <br/>
            With TripMate, your journey is smooth, well-planned, and stress-free. Say goodbye to messy travel notes and last-minute confusion—TripMate ensures a reliable, hassle-free, and fun travel experience.
        </p>
      </div>
    </div>
  );
};

// the path is correct but the styling is not 

export default App
