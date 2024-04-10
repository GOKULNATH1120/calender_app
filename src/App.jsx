import { useState } from "react";
import "./App.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function App() {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectDate, setSelectDate] = useState(new Date());

  const daysInMonth = () => {
    const daysArray = [];

    const firstDay = new Date(
      selectDate.getFullYear(),
      selectDate.getMonth(),
      1
    );

    const lastDay = new Date(
      selectDate.getFullYear(),
      selectDate.getMonth() + 1,
      0
    );

    for (let i = 0; i < firstDay.getDay(); i++) {
      daysArray.push(null);
    }

    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysArray.push(
        new Date(selectDate.getFullYear(), selectDate.getMonth(), i)
      );
    }
    return daysArray;
  };

  const handleChangeMonth = (e) => {
    const newMonth = parseInt(e.target.value, 10);
    setSelectDate(new Date(selectDate.getFullYear(), newMonth, 1));
  };

  const handleChangeYear = (e) => {
    const newYear = parseInt(e.target.value, 10);
    setSelectDate(new Date(newYear, selectDate.getMonth(), 1));
  };

  const isSameDay = (date1, date2) => {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };
  return (
    <>
        <h1 className="calendar-app">Calendar App</h1>
      <div className="calender">
        <div className="header">
          <button
            onClick={() => {
              setSelectDate(
                new Date(selectDate.getFullYear(), selectDate.getMonth() - 1, 1)
              );
            }}
          >
            <FaArrowLeft />
          </button>
          <select value={selectDate.getMonth()} onChange={handleChangeMonth}>
            {months.map((month, index) => (
              <option key={index} value={index}>
                {" "}
                {month}
              </option>
            ))}
          </select>
          <select value={selectDate.getFullYear()} onChange={handleChangeYear}>
            {Array.from(
              { length: 10 },
              (_, i) => selectDate.getFullYear() - 5 + i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>

          <button
            onClick={() => {
              setSelectDate(
                new Date(selectDate.getFullYear(), selectDate.getMonth() + 1, 1)
              );
            }}
          >
            <FaArrowRight />
          </button>
        </div>
        <div className="daysOfWeek">
          {daysOfWeek.map((day) => (
            <div key={day}>{day} </div>
          ))}
        </div>

        <div className="days">
          {daysInMonth().map((day, index) => (
            <div
              key={index}
              className={
                day
                  ? isSameDay(day, new Date())
                    ? "day current"
                    : "day"
                  : "empty"
              }
            >
              {day ? day.getDate() : ""}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
