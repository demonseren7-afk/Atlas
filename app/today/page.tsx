import { generateWorkout } from "../../lib/ai/workoutPrompt";
import { mockUserProfile } from "../../lib/mockUserProfile";

export const dynamic = "force-dynamic";

export default async function TodayPage() {
  const result = await generateWorkout(mockUserProfile);
  const workout = result.workout;
  const decision = result.decision;

  return (
    <main>
      <h1 className="page-title">Today</h1>
      <p className="page-copy">AI-generated workout for the current profile.</p>
      <section className="panel">
        <h2>Day type: {workout.day_type}</h2>
        <ol className="list">
          {workout.exercises.map((exercise) => (
            <li key={exercise.name}>
              <strong>{exercise.name}</strong>: {exercise.sets} sets x {exercise.reps},{" "}
              {exercise.rest_seconds}s rest
            </li>
          ))}
        </ol>
        <p>
          <strong>Coach note:</strong> {workout.coach_note}
        </p>
        <p>
          <strong>Decision summary:</strong> fatigue {decision.fatigue_level}, recovery{" "}
          {decision.recovery_quality}, strategy {decision.training_strategy}
        </p>
      </section>
    </main>
  );
}
