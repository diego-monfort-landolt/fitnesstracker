import React, { useRef, useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
} from "react-leaflet";
import "../index.css";
// import { ChartSection } from "./ChartSection";
type Position = [number, number];
interface WorkoutEntry {
  id: number;
  mode: string;
  distance: string;
  duration: string;
  date: string;
  path: Position[];
}

const WorkoutTracker: React.FC = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [positions, setPositions] = useState<Position[]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [distance, setDistance] = useState(0);
  const [mode, setMode] = useState("Joggen");
  const [pastWorkouts, setPastWorkouts] = useState<WorkoutEntry[]>([]);

  const watchId = useRef<number | null>(null);

  // Laden der vergangenen Workouts aus LocalStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("workouts") || "[]");
    setPastWorkouts(stored.reverse());
  }, []);

  // Startposition holen und initialisieren
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const currentPos: Position = [pos.coords.latitude, pos.coords.longitude];
          setPositions([currentPos]);
        },
        (err) => console.error("Fehler beim Standortabruf:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const startTracking = () => {
    setPositions([]);
    setDistance(0);
    setStartTime(new Date());
    setEndTime(null);
    setIsTracking(true);

    if (navigator.geolocation) {
      watchId.current = navigator.geolocation.watchPosition(
        (pos) => {
          const newPos: Position = [pos.coords.latitude, pos.coords.longitude];
          setPositions((prev) => {
            if (prev.length > 0) {
              const last = prev[prev.length - 1];
              const dist = getDistance(last, newPos);
              setDistance((d) => d + dist);
            }
            return [...prev, newPos];
          });
        },
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    }
  };

  const stopTracking = () => {
    setIsTracking(false);
    const end = new Date();
    setEndTime(end);

    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current);
    }

    if (startTime && positions.length > 1) {
      const entry: WorkoutEntry = {
        id: Date.now(),
        mode,
        distance: distance.toFixed(2),
        duration: getDuration(startTime, end),
        date: new Date().toISOString(),
        path: positions,
      };

      const stored = JSON.parse(localStorage.getItem("workouts") || "[]");
      const updated = [entry, ...stored];
      localStorage.setItem("workouts", JSON.stringify(updated));
      setPastWorkouts(updated);
    }
  };

  const deleteWorkout = (id: number) => {
    const updated = pastWorkouts.filter((w) => w.id !== id);
    setPastWorkouts(updated);
    localStorage.setItem("workouts", JSON.stringify(updated));
  };

  const getDistance = (p1: Position, p2: Position): number => {
    const R = 6371;
    const dLat = deg2rad(p2[0] - p1[0]);
    const dLon = deg2rad(p2[1] - p1[1]);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(p1[0])) *
        Math.cos(deg2rad(p2[0])) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const deg2rad = (deg: number): number => deg * (Math.PI / 180);

  const getDuration = (start: Date, end: Date): string => {
    const ms = end.getTime() - start.getTime();
    const mins = Math.round(ms / 1000 / 60);
    return `${mins} Min`;
  };

  return (
    <div className="tracker-container card">
      <h2>🏃 Workout starten</h2>

      <div className="tracker-controls">
        <label>
          Modus:
          <select value={mode} onChange={(e) => setMode(e.target.value)}>
            <option>Joggen</option>
            <option>Laufen</option>
            <option>Wandern</option>
          </select>
        </label>

        <button onClick={isTracking ? stopTracking : startTracking}>
          {isTracking ? "⏹️ Stop" : "▶️ Start"}
        </button>
      </div>

      <div className="tracker-stats">
        <p>📏 Distanz: {distance.toFixed(2)} km</p>
        <p>
          ⏱️ Dauer:{" "}
          {endTime ? getDuration(startTime!, endTime) : isTracking ? "läuft..." : "-"}
        </p>
      </div>

      <div className="tracker-map">
        {positions.length > 0 ? (
          <MapContainer
            center={positions[0]}
            zoom={16}
            style={{ height: "300px", width: "100%", borderRadius: "0.5rem" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="© OpenStreetMap"
            />
            <Polyline positions={positions} color="blue" />
            <Marker position={positions[0]}>
              <Popup>Start</Popup>
            </Marker>
            <Marker position={positions[positions.length - 1]}>
              <Popup>Ende</Popup>
            </Marker>
          </MapContainer>
        ) : (
          <p>📍 Karte wird angezeigt, sobald du startest</p>
        )}
      </div>

      {/* Fortschritts-Chart - anpassen auf relevante Daten (km, Dauer, Datum) */}
      {/* {pastWorkouts.length > 0 && (
        <ChartSection
          data={pastWorkouts.map((w) => ({
            date: new Date(w.date).toLocaleDateString(), // nur Datum
            workoutMinutes: parseInt(w.duration), // Dauer in Minuten
            calories: parseFloat(w.distance) * 60, // Beispiel: kcal pro km
            distance: parseFloat(w.distance), // Distanz (km)
            sleepHours: 0, // Default value for sleepHours
          }))}
        />
      )} */}

      {/* Neue Karten für vergangene Workouts */}
      {pastWorkouts.length > 0 && (
        <div className="card" style={{ marginTop: "2rem" }}>
          <h3>📌 Vergangene Workouts</h3>
          <ul className="workout-history">
            {pastWorkouts.map((w) => (
              <li key={w.id} className="card small-card workout-card">
                <button
                  className="delete-button"
                  onClick={() => deleteWorkout(w.id)}
                  title="Workout löschen"
                >
                  ❌
                </button>

                <div className="workout-info">
                  <strong>{new Date(w.date).toLocaleDateString()}</strong> – {w.mode}
                  <div>📏 {w.distance} km | ⏱️ {w.duration}</div>
                </div>

                <MapContainer
                  center={w.path[0]}
                  zoom={14}
                  style={{
                    height: "200px",
                    width: "100%",
                    marginTop: "0.5rem",
                    borderRadius: "0.5rem",
                  }}
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Polyline positions={w.path} color="blue" />
                  <Marker position={w.path[0]}>
                    <Popup>Start</Popup>
                  </Marker>
                  <Marker position={w.path[w.path.length - 1]}>
                    <Popup>Ende</Popup>
                  </Marker>
                </MapContainer>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default WorkoutTracker;
