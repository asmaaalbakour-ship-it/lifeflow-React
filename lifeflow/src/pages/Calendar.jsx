import { useState } from "react";
import "./Calendar.css";
function Calendar({ selectedDate, onDateSelect, habits }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const hasCompletedHabits = (date) => {
  const dayHabits = habits[date] || [];
  return dayHabits.some((habit) => habit.completed);
};

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();
  const monthName = currentDate.toLocaleString("en-US", { month: "long" });

  const changeMonth = (amount) => {
    setCurrentDate(new Date(year, month + amount, 1));
  };

  const selectDay = (day) => {
    const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    onDateSelect(date);
  };

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month">
          ←
        </button>

        <h2>
          {monthName} {year}
        </h2>

        <button type="button" onClick={() => changeMonth(1)} aria-label="Next month">
          →
        </button>
      </div>

      <div className="weekdays">
        <span>Sun</span>
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
      </div>

      <div className="calendar-grid">
        {Array.from({ length: firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="empty-day" />
        ))}

        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const date = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
          const isSelected = selectedDate === date;

          return (
  <button
    key={day}
    className={
      isSelected
        ? "calendar-day selected-day"
        : "calendar-day"
    }
    onClick={() => selectDay(day)}
  >
    <span>{day}</span>

   {hasCompletedHabits(date) && (
  <span className="habit-dot">●</span>
)}
  </button>
);
        })}
      </div>
    </div>
  );
}

export default Calendar;

