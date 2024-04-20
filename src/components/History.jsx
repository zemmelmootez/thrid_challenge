import React from "react";

const SymptomsHistory = () => {
  const symptomsHistory =
    JSON.parse(localStorage.getItem("symptomsHistory")) || [];

  return (
    <div>
      <h3>Symptoms History</h3>
      <ul>
        {symptomsHistory.map((symptom, index) => (
          <li key={index}>
            <strong>Entry {index + 1}:</strong>
            <ul>
              <li>Pain Level: {symptom.painLevel}</li>
              <li>Fatigue Level: {symptom.fatigueLevel}</li>
              <li>Mood: {symptom.mood}</li>
              <li>Additional Info: {symptom.additionalInfo}</li>
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SymptomsHistory;
