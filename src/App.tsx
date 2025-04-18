import { useLocalStorage } from "./hooks/useLocalStorage";
import { Entry } from "./types/tracker";
import { TrackerForm } from "./components/TrackerForm";
import { ChartSection } from "./components/ChartSection";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { DailyGoals } from "./components/DailyGoals";
import { DailyReview } from "./components/DailyReview";
import WorkoutTracker from "./components/WorkoutTracker";


function App() {
  const [entries, setEntries] = useLocalStorage<Entry[]>("entries", []);

  const handleAdd = (entry: Entry) => {
    setEntries([...entries, entry]);
  };

  return (
    <div className="container">
      <header className="card">
        <h1>🏋️‍♂️ Fitness Tracker</h1>
        <DarkModeToggle />
      </header>
      <WorkoutTracker />
      <TrackerForm onAdd={handleAdd} />
      <DailyGoals latest={entries[entries.length - 1]} />
      <ChartSection data={entries} />
      <DailyReview latest={entries[entries.length - 1]} /> 

    </div>
  );
}
export default App;