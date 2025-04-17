import { Entry } from "../types/tracker";

interface Props {
  latest?: Entry;
}

export const DailyGoals: React.FC<Props> = ({ latest }) => {
  if (!latest) return null;
  return (
    <div className="card">
      <h3>Daily Goals</h3>
      <p>Workout: {latest.workoutMinutes} / 30 min</p>
      <p>Calories: {latest.calories} / 2000 kcal</p>
      <p>Sleep: {latest.sleepHours} / 8 hrs</p>
    </div>
  );
};
