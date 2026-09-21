import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import "./DailyHabits.css";

const defaultHabits = [
  {
    id: 1,
    name: "Read Quran",
    icon: "📖",
    completed: false,
  },
  {
    id: 2,
    name: "Exercise",
    icon: "🏃",
    completed: false,
  },
  {
    id: 3,
    name: "Drink Water",
    icon: "💧",
    completed: false,
  },
  {
    id: 4,
    name: "Study Programming",
    icon: "💻",
    completed: false,
  },
];

function getToday() {
  const today = new Date();

  const year = today.getFullYear();
  const month = String(
    today.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    today.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function DailyHabits({ habits, setHabits }) {
  const [selectedDate, setSelectedDate] =
    useState(getToday());

  const [newHabit, setNewHabit] =
    useState("");

  // Create today's default habits
  useEffect(() => {
    if (!habits[selectedDate]) {
      setHabits((previous) => ({
        ...previous,
        [selectedDate]: defaultHabits,
      }));
    }
  }, [selectedDate, habits, setHabits]);

  // Save habits
  useEffect(() => {
    localStorage.setItem(
      "lifeflow-habits",
      JSON.stringify(habits)
    );
  }, [habits]);

  const todayHabits =
    habits[selectedDate] || [];

  const completedCount =
    todayHabits.filter(
      (habit) => habit.completed
    ).length;

  const progress =
    todayHabits.length === 0
      ? 0
      : Math.round(
          (completedCount /
            todayHabits.length) *
            100
        );

  const calculateStreak = () => {
    let streak = 0;
    const date = new Date();

    while (true) {
      const year = date.getFullYear();

      const month = String(
        date.getMonth() + 1
      ).padStart(2, "0");

      const day = String(
        date.getDate()
      ).padStart(2, "0");

      const dateKey =
        `${year}-${month}-${day}`;

      const dayHabits =
        habits[dateKey] || [];

      const completed =
        dayHabits.some(
          (habit) => habit.completed
        );

      if (!completed) {
        break;
      }

      streak++;

      date.setDate(
        date.getDate() - 1
      );
    }

    return streak;
  };

  const streak = calculateStreak();

  const toggleHabit = (id) => {
    setHabits((previous) => ({
      ...previous,

      [selectedDate]:
        previous[selectedDate].map(
          (habit) =>
            habit.id === id
              ? {
                  ...habit,
                  completed:
                    !habit.completed,
                }
              : habit
        ),
    }));
  };

  const addHabit = () => {
    if (!newHabit.trim()) return;

    const habit = {
      id: Date.now(),
      name: newHabit.trim(),
      icon: "🌱",
      completed: false,
    };

    setHabits((previous) => ({
      ...previous,

      [selectedDate]: [
        ...(previous[selectedDate] || []),
        habit,
      ],
    }));

    setNewHabit("");
  };

  const deleteHabit = (id) => {
    setHabits((previous) => ({
      ...previous,

      [selectedDate]:
        previous[selectedDate].filter(
          (habit) => habit.id !== id
        ),
    }));
  };

  return (
    <div className="habits-page">
      <div className="habits-header">
        <div>
          <h1>
            Daily Habits 🌱
          </h1>

          <p>
            Build small habits and create
            a better routine.
          </p>
        </div>

        <div className="progress-circle">
          <strong>
            {progress}%
          </strong>

          <span>
            Today
          </span>
        </div>

        <div className="streak-card">
          <span>🔥</span>

          <strong>
            {streak}
          </strong>

          <small>
            Day Streak
          </small>
        </div>
      </div>

      <section className="calendar-section">
        <h2>
          Choose a day 📅
        </h2>

        <Calendar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          habits={habits}
        />

        <p className="selected-date">
          Selected date:
          <strong>
            {" "}
            {selectedDate}
          </strong>
        </p>

        <p className="habit-counter">
          {completedCount} of{" "}
          {todayHabits.length}{" "}
          habits completed
        </p>
      </section>

      <section className="add-habit">
        <input
          type="text"
          placeholder="Add a new habit..."
          value={newHabit}
          onChange={(event) =>
            setNewHabit(
              event.target.value
            )
          }
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              addHabit();
            }
          }}
        />

        <button onClick={addHabit}>
          + Add Habit
        </button>
      </section>

      <section className="habit-list">
        {todayHabits.length === 0 ? (
          <div className="empty-habits">
            <span>🌿</span>

            <h3>
              No habits for this day
            </h3>

            <p>
              Add your first habit above.
            </p>
          </div>
        ) : (
          todayHabits.map((habit) => (
            <div
              key={habit.id}
              className={`habit-card ${
                habit.completed
                  ? "habit-completed"
                  : ""
              }`}
            >
              <div className="habit-info">
                <span className="habit-icon">
                  {habit.icon}
                </span>

                <div>
                  <h3>
                    {habit.name}
                  </h3>

                  <p>
                    {habit.completed
                      ? "Completed 🎉"
                      : "Not completed yet"}
                  </p>
                </div>
              </div>

              <div className="habit-actions">
                <button
                  className="complete-btn"
                  onClick={() =>
                    toggleHabit(habit.id)
                  }
                >
                  {habit.completed
                    ? "✓ Done"
                    : "Complete"}
                </button>

                <button
                  className="delete-habit"
                  onClick={() =>
                    deleteHabit(habit.id)
                  }
                >
                  🗑️
                </button>
              </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default DailyHabits;