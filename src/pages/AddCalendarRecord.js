import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AddCalendarRecord.css';
import Layout from '../components/Layout';
import api from '../axiosConfig';
import AuthContext from '../AuthContext';

const AddCalendarRecord = () => {
  const [formData, setFormData] = useState({
    live_video_link: '',
    trainer_name: '',
    time_date: '',
    title: '',
    trainer_image: '',
    background_color: ''
  });
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const eventId = new URLSearchParams(location.search).get('edit');

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await api.get(`/calendar/${eventId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        });
        const eventData = response.data;
        // Format the date for the datetime-local input
        const formattedDate = new Date(eventData.time_date).toISOString().slice(0, 16);
        setFormData({ ...eventData, time_date: formattedDate });
      } catch (error) {
        console.error('Error fetching event data:', error);
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId, auth.token]); // Updated dependency array

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (eventId) {
        await api.put(`/calendar/${eventId}`, formData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`
          }
        });
        alert('Event updated successfully');
      } else {
        await api.post('/calendar', formData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}`
          }
        });
        alert('Event added successfully');
      }
      navigate('/calendar');
    } catch (error) {
      console.error('Error submitting event:', error.response ? error.response.data : error.message);
      alert('Error submitting event');
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/calendar/${eventId}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      alert('Event deleted successfully');
      navigate('/calendar');
    } catch (error) {
      console.error('Error deleting event:', error);
      alert('Error deleting event');
    }
  };

  return (
    <Layout>
      <div className="add-calendar-record-container">
        <h2 className="title">{eventId ? 'Edit Calendar Record' : 'Add Calendar Record'}</h2>
        <form className="add-calendar-record-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="live_video_link">Live Video Link</label>
            <input
              type="text"
              id="live_video_link"
              name="live_video_link"
              value={formData.live_video_link}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="trainer_name">Trainer Name</label>
            <input
              type="text"
              id="trainer_name"
              name="trainer_name"
              value={formData.trainer_name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time_date">Time and Date</label>
            <input
              type="datetime-local"
              id="time_date"
              name="time_date"
              value={formData.time_date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="trainer_image">Trainer Image URL</label>
            <input
              type="text"
              id="trainer_image"
              name="trainer_image"
              value={formData.trainer_image}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="background_color">Background Color</label>
            <input
              type="color"
              id="background_color"
              name="background_color"
              value={formData.background_color}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">{eventId ? 'Update Event' : 'Add Event'}</button>
          {eventId && (
            <button type="button" className="delete-button" onClick={handleDelete}>
              Delete Event
            </button>
          )}
        </form>
      </div>
    </Layout>
  );
};

export default AddCalendarRecord;
