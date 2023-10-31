import { useEffect, useState } from "react";
import "./Timer.css";

export default function Timer() {
  const [time, setTime] = useState(null);
  const [timeOfDay, setTimeOfDay] = useState(null);
  const [theme, setTheme] = useState("light");

  function doStuff() {
    // Define the initial date
    const initialDate = new Date("2023-10-30T12:07:00");

    // Get the current date and time
    const currentDate = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference = currentDate - initialDate;

    // Convert milliseconds to seconds, minutes, hours, days, weeks, months, and years
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    // Calculate remaining hours, minutes, and seconds
    const remainingHours = hours % 24;
    const remainingMinutes = minutes % 60;
    const remainingSeconds = seconds % 60;

    // Calculate months and years
    const initialYear = initialDate.getFullYear();
    const initialMonth = initialDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    let years = currentYear - initialYear;
    let months = currentMonth - initialMonth;

    if (months < 0) {
      years--;
      months += 12;
    }

    // console.log(
    //   `Time passed since ${initialDate.toDateString()} ${initialDate.toLocaleTimeString()}:`
    // );
    // console.log(
    //   `${years} years, ${months} months, ${weeks} weeks, ${days} days, ${remainingHours} hours, ${remainingMinutes} minutes, ${remainingSeconds} seconds.`
    // );
    setTime({
      ...time,
      years,
      months,
      weeks,
      days,
      hours: remainingHours,
      minutes: remainingMinutes,
      seconds: remainingSeconds,
    });
    let titleString = "";
    if (time) {
      titleString = `Since you left ${years}Y ${months}M ${weeks}W ${days}D ${remainingHours}H ${remainingMinutes}M ${remainingSeconds}S `;
    }

    document.title = titleString;

    // Greeting
    let timeOfDay = "";
    if (currentDate.getHours() < 12) {
      timeOfDay = "Good morning";
      setTheme("light");
    } else if (currentDate.getHours() < 18) {
      timeOfDay = "Good afternoon";
    } else if (currentDate.getHours() < 20) {
      timeOfDay = "Good evening";
    } else {
      timeOfDay = "Good night";
      setTheme("dark");
    }
    setTimeOfDay(timeOfDay);
  }

  useEffect(() => {
    const interval = setInterval(() => doStuff(), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    document.body.className = "theme-" + theme;
  }, [theme]);

  return (
    <div>
      {time ? (
        <>
          <h1>{timeOfDay ? timeOfDay + "!" : null}</h1>
          <h1>Time since you left</h1>
          <div className="main-container">
            {time?.years > 0 && (
              <div className="element">{time?.years} years </div>
            )}
            <div className="element">{time?.months} months </div>
            {time?.weeks > 0 && (
              <div className="element">{time?.weeks} weeks </div>
            )}
            <div className="element">
              {time?.days} {time?.days > 1 ? "days" : "day"}
            </div>
            <div className="element">{time?.hours} hours </div>
            <div className="element">{time?.minutes} mins </div>
            <div className="element">{time?.seconds} secs </div>
          </div>
        </>
      ) : (
        <div>
          <h1>Please wait...</h1>
        </div>
      )}
    </div>
  );
}
