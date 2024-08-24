"use client";

import React, { useState, useEffect } from "react";

function DateTimeDisplay() {
  const [currentDate, setCurrentDate] = useState<string>("");
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const daysOfWeek: string[] = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const monthsOfYear: string[] = [
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

    const updateDateTime = () => {
      const now: Date = new Date();
      const dayOfWeek: string = daysOfWeek[now.getDay()];
      const month: string = monthsOfYear[now.getMonth()];
      const dayOfMonth: number = now.getDate();
      const year: number = now.getFullYear();

      let hours: number = now.getHours();
      let minutes: number = now.getMinutes();
      const ampm: string = hours >= 12 ? "PM" : "AM";
      hours = hours % 12;
      hours = hours ? hours : 12; // Handle midnight
      const minutesStr: string =
        minutes < 10 ? "0" + minutes : minutes.toString();

      const formattedDate: string = `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;

      const formattedTime: string = `${hours}:${minutesStr} ${ampm}`;

      setCurrentDate(formattedDate);
      setCurrentTime(formattedTime);
    };

    // Update the date and time every second
    const intervalId: NodeJS.Timeout = setInterval(updateDateTime, 1000);

    // Call the function initially to set the date and time right away
    updateDateTime();

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-4xl font-extrabold lg:text-7xl">{currentTime}</h1>
      <p className="text-lg font-medium text-sky-1 lg:text-2xl">
        {currentDate}
      </p>
    </div>
  );
}

export default DateTimeDisplay;
