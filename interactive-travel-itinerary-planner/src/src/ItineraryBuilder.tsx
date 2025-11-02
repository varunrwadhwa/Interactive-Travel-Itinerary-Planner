import { useState, useEffect } from "react";
import "./ItineraryBuilder.css";

function ItineraryBuilder() {
  const [tripData, setTripData] = useState<any>(null);
  const [itinerary, setItinerary] = useState([{ day: 1, activities: [""] }]);

  useEffect(() => {
    const data = localStorage.getItem("tripData");
    if (data) setTripData(JSON.parse(data));
  }, []);

  const addDay = () => {
    setItinerary([...itinerary, { day: itinerary.length + 1, activities: [""] }]);
  };

  const handleActivityChange = (dayIndex: number, actIndex: number, value: string) => {
    const updated = [...itinerary];
    updated[dayIndex].activities[actIndex] = value;
    setItinerary(updated);
  };

  const addActivity = (dayIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].activities.push("");
    setItinerary(updated);
  };

  return (
    <>
      <div className="floating-emojis">
        <span>🌞</span>
        <span>😎</span>
        <span>🎒</span>
        <span>🏖️</span>
        <span>🍹</span>
        <span>🌅</span>
        <span>🧭</span>
      </div>

      <div className="itinerary-page">
        <h1>{tripData?.name || "My Trip"}</h1>
        <h3>{tripData?.destination}</h3>

        {itinerary.map((day, i) => (
          <div key={i} className="day-block">
            <h2>Day {day.day}</h2>
            {day.activities.map((act, j) => (
              <input
                key={j}
                type="text"
                value={act}
                placeholder="Enter activity"
                onChange={(e) => handleActivityChange(i, j, e.target.value)}
              />
            ))}
            <button onClick={() => addActivity(i)}>+ Add Activity</button>
          </div>
        ))}

        <button onClick={addDay}>+ Add Day</button>
      </div>
    </>
  );
}

export default ItineraryBuilder;
