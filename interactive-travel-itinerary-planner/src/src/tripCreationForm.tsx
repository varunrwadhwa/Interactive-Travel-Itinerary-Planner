import "./tripCreationForm.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function TripCreationForm() {
  const navigate = useNavigate();

  const [trip, setTrip] = useState({
    name: "",
    destination: "",
    startDate: "",
    endDate: "",
    travelers: "",
    budget: "",
    transportation: "",
    accommodation: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTrip({ ...trip, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("tripData", JSON.stringify(trip)); // Save trip details
    navigate("/itinerary"); // Navigate to itinerary builder page
  };

  return (
    <div className="trip-page">
      <div className="floating-emojis">
        <span>✈️</span>
        <span>🌍</span>
        <span>🧳</span>
        <span>🚗</span>
        <span>🏖️</span>
      </div>

      <form onSubmit={handleSubmit} className="trip-form expanded">
        <h2>Create Your Trip</h2>

        <input
          type="text"
          name="name"
          placeholder="Trip Name"
          value={trip.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="destination"
          placeholder="Destination"
          value={trip.destination}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="startDate"
          value={trip.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          value={trip.endDate}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="travelers"
          placeholder="Number of Travelers"
          value={trip.travelers}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="budget"
          placeholder="Estimated Budget (in ₹)"
          value={trip.budget}
          onChange={handleChange}
          required
        />

        <select
          name="transportation"
          value={trip.transportation}
          onChange={handleChange}
          required
        >
          <option value="">Select Transportation Mode</option>
          <option value="flight">Flight</option>
          <option value="train">Train</option>
          <option value="car">Car</option>
          <option value="bus">Bus</option>
          <option value="cruise">Cruise</option>
        </select>

        <select
          name="accommodation"
          value={trip.accommodation}
          onChange={handleChange}
          required
        >
          <option value="">Select Accommodation Type</option>
          <option value="hotel">Hotel</option>
          <option value="hostel">Hostel</option>
          <option value="airbnb">Airbnb</option>
          <option value="camping">Camping</option>
        </select>

        <textarea
          name="notes"
          placeholder="Additional Notes (optional)"
          value={trip.notes}
          onChange={handleChange}
          rows={3}
        />

        <button type="submit">Create Itinerary</button>
      </form>
    </div>
  );
}

export default TripCreationForm;
