export default function DashboardPage() {
  return (
    <div className="text-center">
      <h1>Dashboard</h1>

      <section>
        <h2>Today</h2>
        <p>No workout logged today</p>
      </section>

      <section>
        <h2>Recent Workouts</h2>
        <ul>
          <li>Push Day - 55 min</li>
          <li>Pull Day - 50 min</li>
          <li>Leg Day - 60 min</li>
        </ul>
      </section>

      <button>Start Workout</button>
    </div>
  );
}
