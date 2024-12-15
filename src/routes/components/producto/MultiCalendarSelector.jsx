import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';

const MultiCalendarSelector = ({ onDatesChange, stock }) => {
  const [selectedDates, setSelectedDates] = useState([]);

  useEffect(() => {
    console.log(selectedDates); 
  }, [selectedDates]);

  const handleMultiDateSelection = (date) => {
    const formattedDate = format(date, 'dd-MM-yy');
    const existingDateIndex = selectedDates.findIndex(
      (d) => d.fecha === formattedDate
    );

    if (existingDateIndex !== -1) {
      const updatedDates = selectedDates.filter(
        (_, index) => index !== existingDateIndex
      );
      setSelectedDates(updatedDates);
      onDatesChange(updatedDates); 
    } else {
      const newDate = { fecha: formattedDate, stock };
      const updatedDates = [...selectedDates, newDate];
      setSelectedDates(updatedDates);
      onDatesChange(updatedDates);
    }
  };

  return (
    <div style={{ display: 'flex', gap: '1rem', padding: '1rem' }}>
      <div className='content-calendar'>
        <Calendar
          onClickDay={handleMultiDateSelection}
          tileClassName={({ date }) =>
            selectedDates.find((d) => d.fecha === format(date, 'dd-MM-yy'))
              ? 'selected-date'
              : ''
          }
        />
      </div>
    </div>
  );
};

export default MultiCalendarSelector;