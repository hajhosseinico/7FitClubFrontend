import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import jalaali from 'jalaali-js';
import './Calendar.css';
import Layout from '../components/Layout';
import AuthContext from '../AuthContext';
import edge from '../assets/images/edge.png';
import CalendarEvents from './CalendarEvents';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState('');
  const [daysInWeek, setDaysInWeek] = useState([]);
  const [dayNumbers, setDayNumbers] = useState([]);
  const [formattedDate, setFormattedDate] = useState('');
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Calendar component auth state:', auth);
  }, [auth]);

  const isEventLive = useCallback((startTimeString, durationMinutes) => {
    const currentTime = new Date();
    const datePart = startTimeString.split('T')[0];
    const timePart = startTimeString.split('T')[1].split('.')[0];
    const localDateTimeString = `${datePart}T${timePart}`;
    const startTime = new Date(localDateTimeString);
    const endTime = new Date(startTime.getTime() + durationMinutes * 60000);

    console.log("Current Time:", currentTime.toString());
    console.log("Start Time:", startTime.toString());
    console.log("End Time:", endTime.toString());
    console.log("Is Live:", currentTime >= startTime && currentTime <= endTime);
    console.log("User:", auth.userType);

    return currentTime >= startTime && currentTime <= endTime;
  }, [auth.userType]);

  const getCurrentMonth = useCallback(() => {
    const monthNamesFarsi = [
      'فروردین', 'اردیبهشت', 'خرداد', 'تیر', 'مرداد', 'شهریور',
      'مهر', 'آبان', 'آذر', 'دی', 'بهمن', 'اسفند'
    ];
    const date = new Date();
    const jalaaliDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const monthIndex = jalaaliDate.jm - 1;
    setCurrentMonth(monthNamesFarsi[monthIndex]);
    setFormattedDate(englishToFarsiNumbers(`${jalaaliDate.jd} ${monthNamesFarsi[monthIndex]}, ${getFarsiDayName(date.getDay())}`));
  }, []);

  useEffect(() => {
    getCurrentMonth();
    generateWeekDays();
  }, [getCurrentMonth]);

  const getFarsiDayName = (dayIndex) => {
    const weekDaysFarsi = ['شنبه', 'یکشنبه', 'دوشنبه', 'سه‌شنبه', 'چهارشنبه', 'پنجشنبه', 'جمعه'];
    return weekDaysFarsi[(dayIndex + 1) % 7];
  };

  const generateWeekDays = () => {
    const weekDaysFarsi = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
    const date = new Date();
    const jalaaliDate = jalaali.toJalaali(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const currentDay = jalaaliDate.jd;

    const gregorianDayOfWeek = date.getDay();
    const jalaliDayOfWeek = (gregorianDayOfWeek + 1) % 7;

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

  const englishToFarsiNumbers = (str) => {
    const englishNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const farsiNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

    return str.replace(/\d/g, (digit) => farsiNumbers[englishNumbers.indexOf(digit)]);
  };

  const handleEdit = (event) => {
    navigate(`/add-calendar-record?edit=${event.id}`);
  };

  return (
    <Layout>
      <div className="container">
        {auth.userType === 'admin' && (
          <button className="add-button" onClick={() => navigate('/add-calendar-record')}>
            +
          </button>
        )}
        
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

        <CalendarEvents
          isEventLive={isEventLive}
          englishToFarsiNumbers={englishToFarsiNumbers}
          formatTime={formatTime}
          formatTimeWAP={formatTimeWAP}
          calculateEndTime={calculateEndTime}
          onEdit={handleEdit} // Pass handleEdit to CalendarEvents
        />
      </div>
    </Layout>
  );
};

export default Calendar;
