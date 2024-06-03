// src/pages/Trainers.js
import React, { useEffect, useState } from 'react';
import { getTrainers } from '../api';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      const token = localStorage.getItem('token');
      const response = await getTrainers(token);
      setTrainers(response.data);
    };

    fetchTrainers();
  }, []);

  return (
    <div>
      <h1>Trainers</h1>
      <ul>
        {trainers.map((trainer) => (
          <li key={trainer.id}>{trainer.trainer_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Trainers;
