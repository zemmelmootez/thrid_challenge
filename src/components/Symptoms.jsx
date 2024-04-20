import React, { useState, useEffect } from "react";
import { XYPlot, VerticalBarSeries, XAxis, YAxis } from "react-vis";
import ColorSchemesExample from "./Navbar.jsx";
const Symtomps = () => {
  const [painLevel, setPainLevel] = useState("");
  const [fatigueLevel, setFatigueLevel] = useState("");
  const [mood, setMood] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [submittedSymptoms, setSubmittedSymptoms] = useState(null);
  const [symptomsHistory, setSymptomsHistory] = useState([]);

  useEffect(() => {
    const savedSymptoms = localStorage.getItem("symptomsHistory");
    if (savedSymptoms) {
      setSymptomsHistory(JSON.parse(savedSymptoms));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("symptomsHistory", JSON.stringify(symptomsHistory));
  }, [symptomsHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const symptomsSummary = {
      painLevel,
      fatigueLevel,
      mood,
      additionalInfo,
    };

    setSubmittedSymptoms(symptomsSummary);

    setSymptomsHistory([...symptomsHistory, symptomsSummary]);

    setPainLevel("");
    setFatigueLevel("");
    setMood("");
    setAdditionalInfo("");
  };

  const calculateAverageSymptoms = () => {
    if (symptomsHistory.length === 0) return [0, 0, 0];
    const total = symptomsHistory.reduce(
      (acc, symptom) => {
        acc[0] += parseInt(symptom.painLevel);
        acc[1] += parseInt(symptom.fatigueLevel);
        acc[2] += parseInt(symptom.mood);
        return acc;
      },
      [0, 0, 0]
    );
    return total.map((val) => val / symptomsHistory.length);
  };

  const chartData = [
    { x: "Pain Level", y: calculateAverageSymptoms()[0] },
    { x: "Fatigue Level", y: calculateAverageSymptoms()[1] },
    { x: "Mood", y: calculateAverageSymptoms()[2] },
  ];

  return (
    <div>
      <ColorSchemesExample />
      <h2>Symptom Tracker</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Pain Level:
          <input
            type="number"
            value={painLevel}
            onChange={(e) => setPainLevel(e.target.value)}
          />
        </label>
        <br />
        <label>
          Fatigue Level:
          <input
            type="number"
            value={fatigueLevel}
            onChange={(e) => setFatigueLevel(e.target.value)}
          />
        </label>
        <br />
        <label>
          Mood:
          <input
            type="number"
            value={mood}
            onChange={(e) => setMood(e.target.value)}
          />
        </label>
        <br />
        <label>
          Additional Information:
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
      {submittedSymptoms && (
        <div>
          <h3>Submitted Symptoms:</h3>
          <p>Pain Level: {submittedSymptoms.painLevel}</p>
          <p>Fatigue Level: {submittedSymptoms.fatigueLevel}</p>
          <p>Mood: {submittedSymptoms.mood}</p>
          <p>Additional Information: {submittedSymptoms.additionalInfo}</p>
        </div>
      )}
      {symptomsHistory.length > 0 && (
        <div>
          <h3>Symptoms History</h3>
          <XYPlot xType="ordinal" width={400} height={300} xDistance={100}>
            <VerticalBarSeries data={chartData} />
            <XAxis />
            <YAxis />
          </XYPlot>
        </div>
      )}
    </div>
  );
};

export default Symtomps;
