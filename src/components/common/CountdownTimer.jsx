import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

const CountdownTimer = ({ expiresAt }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const expiryDate = new Date(expiresAt);
      const diffMs = expiryDate - now;

      if (diffMs <= 0) {
        setIsExpired(true);
        setTimeLeft('Expired');
        return;
      }

      const diffMins = Math.floor(diffMs / 60000);
      
      // Urgent if less than 30 mins
      setIsUrgent(diffMins < 30);
      
      if (diffMins < 60) {
        setTimeLeft(`${diffMins}m left`);
      } else {
        const hours = Math.floor(diffMins / 60);
        const mins = diffMins % 60;
        setTimeLeft(`${hours}h ${mins}m left`);
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, [expiresAt]);

  let colorClass = 'tag-success'; // > 30 mins
  if (isUrgent) colorClass = 'tag-warning';
  if (isExpired) colorClass = 'tag-danger';

  return (
    <div className={`tag ${colorClass}`} style={{ transition: 'background-color 0.5s ease' }}>
      <Clock size={14} />
      <span>{timeLeft}</span>
    </div>
  );
};

export default CountdownTimer;
