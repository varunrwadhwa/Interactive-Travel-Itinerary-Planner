import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./ItineraryBuilder.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

function ItineraryBuilder() {
  const [tripData, setTripData] = useState<any>(null);
  const [itinerary, setItinerary] = useState<{ id: string; day: number; activities: { id: string; text: string }[] }[]>([]);
  const navigate = useNavigate();

  // Load trip and itinerary data
  useEffect(() => {
    const trip = localStorage.getItem("tripData");
    const savedItinerary = localStorage.getItem("itineraryData");
    if (trip) setTripData(JSON.parse(trip));
    if (savedItinerary) setItinerary(JSON.parse(savedItinerary));
    else setItinerary([{ id: uuidv4(), day: 1, activities: [{ id: uuidv4(), text: "" }] }]);
  }, []);

  // Auto-save itinerary on every change
  useEffect(() => {
    if (itinerary.length > 0) {
      localStorage.setItem("itineraryData", JSON.stringify(itinerary));
    }
  }, [itinerary]);

  const addDay = () => {
    setItinerary([...itinerary, { id: uuidv4(), day: itinerary.length + 1, activities: [{ id: uuidv4(), text: "" }] }]);
    toast.success("Day added!");
  };

  const handleActivityChange = (dayIndex: number, actIndex: number, value: string) => {
    const updated = [...itinerary];
    updated[dayIndex].activities[actIndex].text = value;
    setItinerary(updated);
  };

  const addActivity = (dayIndex: number) => {
    const updated = [...itinerary];
    updated[dayIndex].activities.push({ id: uuidv4(), text: "" });
    setItinerary(updated);
    toast.success("Activity added!");
  };

  const deleteActivity = (dayIndex: number, actId: string) => {
    const updated = [...itinerary];
    updated[dayIndex].activities = updated[dayIndex].activities.filter((a) => a.id !== actId);
    setItinerary(updated);
    toast("Activity deleted!", { icon: "🗑️" });
  };

  const deleteDay = (dayIndex: number) => {
    const updated = itinerary.filter((_, i) => i !== dayIndex);
    setItinerary(updated);
    toast("Day deleted!", { icon: "🗓️" });
  };

  const exportToPDF = async () => {
    const element = document.querySelector(".itinerary-page") as HTMLElement;
    if (!element) return;

    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${tripData?.destination || "Trip"}_Itinerary.pdf`);
    toast.success("Itinerary exported as PDF!");
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="top-navbar">
        <h2>TripMate</h2>
        <div className="nav-actions">
          <button onClick={() => navigate("/")}>🏠 Home</button>
          <button onClick={exportToPDF}>📄 Export</button>
        </div>
      </div>
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

        {/* Trip Summary Bar */}
        {tripData && (
          <div className="trip-summary-bar">
            <p><strong>Destination:</strong> {tripData.destination}</p>
            <p><strong>Dates:</strong> {tripData.startDate} → {tripData.endDate}</p>
            <p><strong>Travelers:</strong> {tripData.travelers}</p>
            <p><strong>Budget:</strong> ₹{tripData.budget}</p>
            <p><strong>Transport:</strong> {tripData.transportation}</p>
            <p><strong>Stay:</strong> {tripData.accommodation}</p>
          </div>
        )}

        <AnimatePresence>
          {itinerary.map((day, i) => (
            <motion.div
              key={day.id}
              className="day-block"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Day {day.day}</h2>

              <AnimatePresence>
                {day.activities.map((act) => (
                  <motion.div
                    key={act.id}
                    className="activity-row"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <input
                      type="text"
                      value={act.text}
                      placeholder="Enter activity"
                      onChange={(e) => handleActivityChange(i, day.activities.indexOf(act), e.target.value)}
                    />
                    <button className="delete-btn" onClick={() => deleteActivity(i, act.id)}>🗑️</button>
                  </motion.div>
                ))}
              </AnimatePresence>

              <button onClick={() => addActivity(i)}>+ Add Activity</button>
              <button className="delete-day-btn" onClick={() => deleteDay(i)}>🗓️ Delete Day</button>
            </motion.div>
          ))}
        </AnimatePresence>

        <button onClick={addDay}>+ Add Day</button>
        <button className="export-btn" onClick={exportToPDF}>📄 Export Itinerary</button>
      </div>
    </>
  );
}

export default ItineraryBuilder;
