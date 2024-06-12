import React, { useState, useEffect, useContext, useCallback } from 'react';
import api from '../axiosConfig';
import AuthContext from '../AuthContext';
import './CalendarEvents.css';

const CalendarEvents = ({ isEventLive, englishToFarsiNumbers, formatTime, formatTimeWAP, calculateEndTime, onEdit }) => {
  const [events, setEvents] = useState([]);
  const { auth } = useContext(AuthContext);

  const fetchEvents = useCallback(async () => {
    console.log('Fetching events...');
    try {
      const response = await api.get('/calendar', {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      console.log('Fetched events:', response.data);
      const sortedEvents = response.data.sort((a, b) => {
        const isALive = isEventLive(a.time_date, 90);
        const isBLive = isEventLive(b.time_date, 90);
        return isBLive - isALive;
      });
      setEvents(sortedEvents);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }, [auth.token, isEventLive]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return (
    <div className="calendar-events">
      {events.map(event => {
        const startTime = englishToFarsiNumbers(formatTime(event.time_date));
        const startTimeTitle = englishToFarsiNumbers(formatTimeWAP(event.time_date));
        const endTime = englishToFarsiNumbers(formatTime(calculateEndTime(event.time_date, 90)));
        const live = isEventLive(event.time_date, 90);
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
              <div className="event-actions">
                <button className="join-button" onClick={() => window.location.href = event.live_video_link}>ورود به لایو</button>
                {auth.userType === 'admin' && (
                  <button className="join-button" onClick={() => onEdit(event)}>ویرایش</button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarEvents;
