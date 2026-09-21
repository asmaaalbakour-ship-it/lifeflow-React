function Dashboard({ goals, habits }) {
  // Goals statistics
  const completedGoals = goals.filter(
    (goal) => goal.completed
  ).length;

  const goalProgress =
    goals.length === 0
      ? 0
      : Math.round(
          (completedGoals / goals.length) * 100
        );

  // Today's date
  const today = new Date();

  const todayKey =
    `${today.getFullYear()}-${String(
      today.getMonth() + 1
    ).padStart(2, "0")}-${String(
      today.getDate()
    ).padStart(2, "0")}`;

  const formattedDate = today.toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  // Today's habits
  const todayHabits = habits[todayKey] || [];
  // Calculate current habit streak
  const calculateStreak = () => {
    let streak = 0;
    const date = new Date();

    while (true) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      const dateKey = `${year}-${month}-${day}`;

      const dayHabits = habits[dateKey] || [];

      const hasCompletedHabit = dayHabits.some(
        (habit) => habit.completed
      );

      if (!hasCompletedHabit) {
        break;
      }

      streak++;

      date.setDate(date.getDate() - 1);
    }

    return streak;
  };

  const streak = calculateStreak();
  const completedHabits =
    todayHabits.filter(
      (habit) => habit.completed
    ).length;

  const totalHabits = todayHabits.length;

  const habitProgress =
    totalHabits === 0
      ? 0
      : Math.round(
          (completedHabits / totalHabits) * 100
        );

  return (
    <section
      id="dashboard"
      className="dashboard"
    >
      {/* Welcome */}
      <div className="welcome">
        <h2>
          Welcome to LifeFlow 👋
        </h2>

        <p>
          Organize your goals and track
          your daily progress.
        </p>
      </div>

      {/* Today's Overview */}
      <div className="today-overview">
        <div>
          <span className="overview-icon">
            📅
          </span>

          <div>
            <h3>Today's Overview</h3>
            <p>{formattedDate}</p>
          </div>
        </div>

        <div className="overview-stats">
          <div>
            <strong>
              {completedHabits}/{totalHabits}
            </strong>
            <span>Habits</span>
          </div>
          <div>
            <strong>
              🔥 {streak}
            </strong>
            <span>Day Streak</span>
          </div>
          <div>
            <strong>
              {completedGoals}/{goals.length}
            </strong>
            <span>Goals</span>
          </div>

          <div>
            <strong>
              {habitProgress}%
            </strong>
            <span>Today</span>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="stats">

        {/* Total Goals */}
        <div className="stat-card">
          <span>🎯</span>

          <h3>Total Goals</h3>

          <strong>
            {goals.length}
          </strong>
        </div>

        {/* Completed Goals */}
        <div className="stat-card">
          <span>✅</span>

          <h3>Completed Goals</h3>

          <strong>
            {completedGoals}
          </strong>
        </div>

        {/* Goal Progress */}
        <div className="stat-card">
          <span>📈</span>

          <h3>Goal Progress</h3>

          <strong>
            {goalProgress}%
          </strong>
        </div>

        {/* Total Habits */}
        <div className="stat-card">
          <span>🌱</span>

          <h3>Total Habits</h3>

          <strong>
            {totalHabits}
          </strong>
        </div>

        {/* Completed Habits */}
        <div className="stat-card">
          <span>✅</span>

          <h3>Completed Today</h3>

          <strong>
            {completedHabits}
          </strong>
        </div>

        {/* Habit Progress */}
        <div className="stat-card">
          <span>🔥</span>

          <h3>Habit Progress</h3>

          <strong>
            {habitProgress}%
          </strong>
        </div>

      </div>

      {/* Progress Bars */}
      <div className="progress-section">

        {/* Goals Progress */}
        <div className="progress-box">

          <div className="progress-title">
            <span>
              🎯 Goals Progress
            </span>

            <strong>
              {goalProgress}%
            </strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${goalProgress}%`,
              }}
            ></div>
          </div>

        </div>

        {/* Habits Progress */}
        <div className="progress-box">

          <div className="progress-title">
            <span>
              🌱 Habits Progress
            </span>

            <strong>
              {habitProgress}%
            </strong>
          </div>

          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{
                width: `${habitProgress}%`,
              }}
            ></div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default Dashboard;