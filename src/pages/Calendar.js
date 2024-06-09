import React, { useState, useEffect, useContext, useCallback } from 'react';
import api from '../axiosConfig'; // Import the configured Axios instance
import jalaali from 'jalaali-js'; // Import jalaali-js for date conversion
import './Calendar.css';
import '../components/SharedStyles.css'; // Import shared styles
import Layout from '../components/Layout'; // Adjust the import path to the components directory
import AuthContext from '../AuthContext'; // Import AuthContext
import edge from '../assets/images/edge.png';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [currentMonth, setCurrentMonth] = useState('');
  const [daysInWeek, setDaysInWeek] = useState([]);
  const [dayNumbers, setDayNumbers] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  const { auth } = useContext(AuthContext); // Get auth from AuthContext

  const fetchEvents = useCallback(async () => {
    try {
      const response = await api.get('/calendar', {
        headers: { Authorization: `Bearer ${auth.token}` }, // Pass the token in the headers
      });
      const sortedEvents = response.data.sort((a, b) => {
        const isALive = isEventLive(a.time_date, 90);
        const isBLive = isEventLive(b.time_date, 90);
        return isBLive - isALive;
      });
      setEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, [auth.token]);

  const getCurrentMonth = useCallback(() => {
    const monthNamesFarsi = [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];
    const date = new Date();
    const jalaaliDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const monthIndex = jalaaliDate.jm - 1; // Get the Jalali month index
    setCurrentMonth(monthNamesFarsi[monthIndex]);
    setFormattedDate(englishToFarsiNumbers(`${jalaaliDate.jd} ${monthNamesFarsi[monthIndex]}, ${getFarsiDayName(date.getDay())}`));
  }, []);

  useEffect(() => {
    fetchEvents();
    getCurrentMonth();
    generateWeekDays();
  }, [fetchEvents, getCurrentMonth]);

  const getFarsiDayName = (dayIndex) => {
    const weekDaysFarsi = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
    return weekDaysFarsi[(dayIndex + 1) % 7]; // Adjust the index to match the Jalali week
  };

  const generateWeekDays = () => {
    const weekDaysFarsi = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
    const date = new Date();
    const jalaaliDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const currentDay = jalaaliDate.jd; // Current day in the month

    // Convert Gregorian day of the week to Jalali day of the week
    const gregorianDayOfWeek = date.getDay(); // 0 (Sunday) - 6 (Saturday)
    const jalaliDayOfWeek = (gregorianDayOfWeek + 1) % 7; // Convert to Jalali where Saturday is 0

    const weekDays = [];
    const dayNumbers = [];

    for (let i = -3; i <= 3; i++) {
      const dayIndex = (jalaliDayOfWeek + i + 7) % 7;
      weekDays.push(weekDaysFarsi[dayIndex]);

      const dayNumber = currentDay + i;
      dayNumbers.push(dayNumber);
    }

    setDaysInWeek(weekDays);
    setDayNumbers(dayNumbers);
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour.toLocaleString('fa-IR', { minimumIntegerDigits: 2 })}:${minute}`;
  };

  const formatTimeWAP = (dateString) => {
    const date = new Date(dateString);
    const hour = date.getHours();
    const minute = date.getMinutes().toString().padStart(2, '0');
    const period =  hour < 12 ? 'صبح' : 'عصر';
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${formattedHour.toLocaleString('fa-IR', { minimumIntegerDigits: 2 })}:${minute} ${period}`;
  };

  const calculateEndTime = (startTimeString, durationMinutes) => {
    const startDate = new Date(startTimeString);
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
    return endDate.toISOString();
  };

  const isEventLive = (startTimeString, durationMinutes) => {
    const currentTime = new Date();
  
    // Manually parse the date string ignoring the timezone part
    const datePart = startTimeString.split('T')[0];
    const timePart = startTimeString.split('T')[1].split('.')[0];
    const localDateTimeString = `${datePart}T${timePart}`;
    const startTime = new Date(localDateTimeString);
    const endTime = new Date(startTime.getTime() + durationMinutes * 60000);
  
    return currentTime >= startTime && currentTime <= endTime;
  };

  const englishToFarsiNumbers = (str) => {
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const farsiNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return str.replace(/\d/g, (digit) => farsiNumbers[englishNumbers.indexOf(digit)]);
  };

  return (
    <Layout>
      <div className="container">
        <div className="calendar-header">
          <h3 className="title-text">لایوهای برنامه ریزی شده</h3>
          <p className="current-month">{currentMonth}</p>
          <div className="weekdays-row">
            {daysInWeek.map((day, index) => (
              <div key={index} className={`weekday ${index === 3 ? 'current-day' : ''}`}>{day}</div>
            ))}
          </div>
          <div className="days-row">
            {dayNumbers.map((day, index) => (
              <div key={index} className={`day-number ${index === 3 ? 'current-day-number' : ''}`}>{englishToFarsiNumbers(day.toString())}</div>
            ))}
          </div>
        </div>
        <div className="edge">
          <img src={edge} alt="Fitclub" className="edge" />
        </div>

        <div className="current-date">
          <p className="formatted-date">{formattedDate}</p>
        </div>

        <div className="calendar-events">
          {events.map(event => {
            const startTime = englishToFarsiNumbers(formatTime(event.time_date));
            const startTimeTitle = englishToFarsiNumbers(formatTimeWAP(event.time_date));
            const endTime = englishToFarsiNumbers(formatTime(calculateEndTime(event.time_date, 90))); // Assume 90 minutes duration
            const live = isEventLive(event.time_date, 90); // Assume 90 minutes duration
            return (
              <div key={event.id} className="event-wrapper-horizontal">
                <div className="event-time">{startTimeTitle}</div>
                <div key={event.id} className="event-wrapper-vertical">
                  <div className="event-card" style={{ backgroundColor: '#E3FDDD' }}>
                    <div className="event-info">
                      <h2>{`${endTime} - ${startTime}`}</h2>
                      <h3>{event.trainer_name}</h3>
                      <p>{event.title}</p>
                    </div>
                    <div className="trainer-image-container">
                      <div className={`trainer-image-wrapper ${live ? 'live' : ''}`}>
                        <img src={event.trainer_image} alt={event.trainer_name} className="trainer-image" />
                        {live && <div className="online-text">آنلاین</div>}
                      </div>
                    </div>
                  </div>
                  {live ? (
                    <a href={event.live_video_link} className="join-button">ورود به لایو</a>
                  ) : (
                    <div className="expired-text">لایو پایان یافته است</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <button className="add-button">+</button>
      </div>
    </Layout>
  );
};

export default Calendar;
