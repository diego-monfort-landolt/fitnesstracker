import { useState } from "react";
import { Entry } from "../types/tracker";

interface Review {
  id: number;
  date: string;
  workoutMinutes: number;
  calories: number;
  sleepHours: number;
}

export const DailyReview = ({ latest }: { latest?: Entry }) => {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const stored = localStorage.getItem("dailyReviews");
    return stored ? JSON.parse(stored) : [];
  });

  const handleSaveReview = () => {
    if (!latest) return;

    const review: Review = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      workoutMinutes: latest.workoutMinutes,
      calories: latest.calories,
      sleepHours: latest.sleepHours,
    };

    const updated = [...reviews, review];
    setReviews(updated);
    localStorage.setItem("dailyReviews", JSON.stringify(updated));
  };

  const handleClear = () => {
    setReviews([]);
    localStorage.removeItem("dailyReviews");
  };

  return (
    <div className="card">
      <h3>Tagesrückblicke</h3>

      <button onClick={handleSaveReview} disabled={!latest}>
        📅 Rückblick speichern
      </button>
      {reviews.length > 0 && (
        <button style={{ marginLeft: "0.5rem" }} onClick={handleClear}>
          🗑️ Alle löschen
        </button>
      )}
      <ul style={{ paddingLeft: "1rem", marginTop: "1rem" }}>
        {reviews.map((r) => (
          <li key={r.id}>
            <strong>{r.date}:</strong> Workout {r.workoutMinutes}min, Kalorien {r.calories}, Schlaf {r.sleepHours}h
          </li>
        ))}
      </ul>
    </div>
  );
};