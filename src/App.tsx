import { useLocalStorage } from "./hooks/useLocalStorage";
import { Entry } from "./types/tracker";
import { TrackerForm } from "./components/TrackerForm";
import { ChartSection } from "./components/ChartSection";
import { DarkModeToggle } from "./components/DarkModeToggle";
import { DailyGoals } from "./components/DailyGoals";

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
      <TrackerForm onAdd={handleAdd} />
      <DailyGoals latest={entries[entries.length - 1]} />
      <ChartSection data={entries} />
    </div>
  );
}
export default App;