   import { useEffect, useState } from "react";
   import "./App.css";
import DailyHabits from "./pages/DailyHabits";
import Dashboard from "./pages/Dashboard";
import Notes from "./pages/Notes";
import Focus from "./pages/Focus";
function App() {
  const [activeSection, setActiveSection] = useState("dashboard");

useEffect(() => {
  const handleScroll = () => {
    const sections = [
      "dashboard",
      "goals",
      "habits",
      "focus",
      "notes",
    ];

    const currentSection = sections.find((id) => {
      const element = document.getElementById(id);

      if (!element) return false;

      const rect = element.getBoundingClientRect();

      return rect.top <= 150 && rect.bottom >= 150;
    });

    if (currentSection) {
      setActiveSection(currentSection);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);
  const [goals, setGoals] = useState([
    { id: 1, title: "Learn React", completed: false },
    { id: 2, title: "Read 20 pages", completed: true },
    { id: 3, title: "Exercise", completed: false },
  ]);

  const [newGoal, setNewGoal] = useState("");

  // Habits data
  const [habits, setHabits] = useState(() => {
    const savedHabits = localStorage.getItem("lifeflow-habits");

    if (savedHabits) {
      return JSON.parse(savedHabits);
    }

    return {};
  });

  const completedGoals = goals.filter(
    (goal) => goal.completed
  ).length;

  const progress =
    goals.length === 0
      ? 0
      : Math.round(
          (completedGoals / goals.length) * 100
        );
const today = new Date();

const todayKey =
  `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}-${String(
    today.getDate()
  ).padStart(2, "0")}`;

const todayHabits = habits[todayKey] || [];

const completedHabitsToday =
  todayHabits.filter(
    (habit) => habit.completed
  ).length;

const totalHabits =
  todayHabits.length;

const habitProgress =
  totalHabits === 0
    ? 0
    : Math.round(
        (completedHabitsToday /
          totalHabits) *
          100
      );
  const addGoal = () => {
    if (newGoal.trim() === "") return;

    const goal = {
      id: Date.now(),
      title: newGoal.trim(),
      completed: false,
    };

    setGoals((prevGoals) => [
      ...prevGoals,
      goal,
    ]);

    setNewGoal("");
  };

  const toggleGoal = (id) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === id
          ? {
              ...goal,
              completed: !goal.completed,
            }
          : goal
      )
    );
  };

  const deleteGoal = (id) => {
    setGoals((prevGoals) =>
      prevGoals.filter(
        (goal) => goal.id !== id
      )
    );
  };

  return (
    <div className="app">
      <header className="header">
        <h1>LifeFlow</h1>

        <nav>
          <a href="#dashboard">
            Dashboard
          </a>

          <a href="#goals">
            Goals
          </a>

          <a href="#habits">
            Daily Habits
          </a>
        </nav>
      </header>
<nav className="navbar">
  <div className="logo">
    LifeFlow 🌿
  </div>

  <div className="nav-links">
  <a
    href="#dashboard"
    className={activeSection === "dashboard" ? "active-nav" : ""}
  >
    Dashboard
  </a>

  <a
    href="#goals"
    className={activeSection === "goals" ? "active-nav" : ""}
  >
    Goals
  </a>

  <a
    href="#habits"
    className={activeSection === "habits" ? "active-nav" : ""}
  >
    Habits
  </a>

  <a
    href="#focus"
    className={activeSection === "focus" ? "active-nav" : ""}
  >
    Focus
  </a>

  <a
    href="#notes"
    className={activeSection === "notes" ? "active-nav" : ""}
  >
    Notes
  </a>
</div>
</nav>
      <main>
        {/* Dashboard */}
        <section
          id="dashboard"
          className="dashboard"
        >
          <div className="welcome">
            <h2>
              Welcome to LifeFlow 👋
            </h2>

            <p>
              Organize your goals and track your
              progress.
            </p>
          </div>

          <div className="stats">
            <div className="stat-card">
              <span>🎯</span>
              <h3>Total Goals</h3>
              <strong>
                {goals.length}
              </strong>
            </div>

            <div className="stat-card">
              <span>✅</span>
              <h3>Completed</h3>
              <strong>
                {completedGoals}
              </strong>
            </div>

            <div className="stat-card">
              <span>📈</span>
              <h3>Progress</h3>
              <strong>
                {progress}%
              </strong>
            </div>
            <div className="stat-card">
  <span>🌱</span>
  <h3>Total Habits</h3>
  <strong>{totalHabits}</strong>
</div>

<div className="stat-card">
  <span>✅</span>
  <h3>Completed Today</h3>
  <strong>
    {completedHabitsToday}
  </strong>
</div>

<div className="stat-card">
  <span>🔥</span>
  <h3>Habit Progress</h3>
  <strong>
    {habitProgress}%
  </strong>
</div>
          </div>
        </section>

        {/* Goals */}
        <section
          id="goals"
          className="goals"
        >
          <h2>My Goals 🎯</h2>

          <div className="add-goal">
            <input
              type="text"
              placeholder="Enter a new goal..."
              value={newGoal}
              onChange={(e) =>
                setNewGoal(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  addGoal();
                }
              }}
            />

            <button onClick={addGoal}>
              + Add Goal
            </button>
          </div>

          <div className="goal-list">
            {goals.length === 0 ? (
              <p className="empty">
                No goals yet. Add your first goal! 🌱
              </p>
            ) : (
              goals.map((goal) => (
                <div
                  key={goal.id}
                  className={`goal-card ${
                    goal.completed
                      ? "completed"
                      : ""
                  }`}
                >
                  <div className="goal-info">
                    <input
                      type="checkbox"
                      checked={goal.completed}
                      onChange={() =>
                        toggleGoal(goal.id)
                      }
                    />

                    <span>
                      {goal.title}
                    </span>
                  </div>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      deleteGoal(goal.id)
                    }
                  >
                    🗑️
                  </button>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Daily Habits */}
        <section id="habits">
          <DailyHabits
            habits={habits}
            setHabits={setHabits}
          />
        </section>
        <main>
  <Dashboard
    goals={goals}
    habits={habits}
  />
  <section id="focus">
  <Focus />
</section>
<section id="notes">
  <Notes />
</section>
 <section id="goals" className="goals">
  <div className="section-header">
    <div>
      <h2>My Goals 🎯</h2>
      <p>Set goals and keep moving forward.</p>
    </div>

    <div className="goal-summary">
      <strong>
        {goals.filter((goal) => goal.completed).length}
      </strong>
      <span>
        / {goals.length} completed
      </span>
    </div>
  </div>

  <div className="add-goal">
    <input
      type="text"
      placeholder="Add a new goal..."
      value={newGoal}
      onChange={(event) => setNewGoal(event.target.value)}
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          addGoal();
        }
      }}
    />

    <button onClick={addGoal}>
      + Add Goal
    </button>
  </div>

  <div className="goal-list">
    {goals.length === 0 ? (
      <div className="empty-goals">
        <span>🎯</span>
        <h3>No goals yet</h3>
        <p>Add your first goal above.</p>
      </div>
    ) : (
      goals.map((goal) => (
        <div
          key={goal.id}
          className={`goal-card ${
            goal.completed ? "goal-completed" : ""
          }`}
        >
          <div className="goal-info">
            <button
              className="goal-check"
              onClick={() => toggleGoal(goal.id)}
            >
              {goal.completed ? "✓" : ""}
            </button>

            <div>
              <h3>{goal.name}</h3>

              <p>
                {goal.completed
                  ? "Goal completed 🎉"
                  : "Keep going 💪"}
              </p>
            </div>
          </div>

          <button
            className="delete-goal"
            onClick={() => deleteGoal(goal.id)}
          >
            🗑️
          </button>
        </div>
      ))
    )}
  </div>
</section>

  <section id="habits">
    <DailyHabits
      habits={habits}
      setHabits={setHabits}
    />
  </section>
</main>
      </main>
    </div>
  );
}

export default App;