import { useState } from "react";
import { Entry } from "../types/tracker";

interface Props {
  onAdd: (entry: Entry) => void;
}

export const TrackerForm: React.FC<Props> = ({ onAdd }) => {
  const [form, setForm] = useState<Entry>({
    date: new Date().toISOString().split("T")[0],
    workoutMinutes: 0,
    calories: 0,
    sleepHours: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(form);
    setForm({ ...form, workoutMinutes: 0, calories: 0, sleepHours: 0 });
  };

  return (
  <form className="card" onSubmit={handleSubmit}>
    <div className="form-row">
      <div className="form-group">
        <label>
          Workout (min):
          <input
            type="number"
            name="workoutMinutes"
            value={form.workoutMinutes}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Calories:
          <input
            type="number"
            name="calories"
            value={form.calories}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Sleep (hrs):
          <input
            type="number"
            name="sleepHours"
            value={form.sleepHours}
            onChange={handleChange}
          />
        </label>
      </div>
    </div>

    <button type="submit" className="btn-submit">Add Entry</button>
  </form>
);
};
