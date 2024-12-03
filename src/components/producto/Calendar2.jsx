import React, { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import './producto.css';

const Calendar2 = ({ stockData, onUpdateStock }) => {
  const [selectedDates, setSelectedDates] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [quantity, setQuantity] = useState(1);
  
  const tileDisabled = ({ date }) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const today = format(new Date(), 'yyyy-MM-dd');
    
    return formattedDate < today || !stockData.some(d => d.fecha === formattedDate && d.stock > 0);
  };

  const tileClassName = ({ date }) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    if (stockData.some(d => d.fecha === formattedDate && d.stock > 0)) {
      return 'available-date'; 
    }
    return '';
  };

  const handleSelectDate = (date) => {
    const formattedDate = format(date, 'yyyy-MM-dd');
    const existingDate = selectedDates.find(d => d.fecha === formattedDate);
    
    const stock = stockData.find(d => d.fecha === formattedDate)?.stock || 0;
    
    if (stock < 1) {
      alert("No hay suficiente stock disponible para la cantidad seleccionada.");
      return;
    }

    if (existingDate) {
      setSelectedDates(prev => {
        const updatedDates = prev.filter(d => d.fecha !== formattedDate);
        const updatedStockData = stockData.map(d => 
          d.fecha === formattedDate ? { ...d, stock: d.stock + existingDate.stock } : d
        );
        onUpdateStock(updatedStockData);
        return updatedDates;
      });
    } else {
      setSelectedDates(prev => [...prev, { fecha: formattedDate, stock: quantity }]);
      const updatedStockData = stockData.map(d => 
        d.fecha === formattedDate ? { ...d, stock: d.stock - quantity } : d
      );
      onUpdateStock(updatedStockData);
    }
  };

  const minDate = new Date();
  minDate.setDate(minDate.getDate()); 

  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);

  return (
    <div className="calendar-container">
      <div className="content-calendar">
        <Calendar
          value={currentDate}
          onClickDay={handleSelectDate}
          tileClassName={tileClassName} 
          tileDisabled={tileDisabled}  
          minDate={minDate}             
          maxDate={maxDate}             
          onChange={setCurrentDate}     
          showNeighboringMonth={true}   
          view="month"                 
        />
      </div>

      <div className="selected-dates">
        <h3>Fechas seleccionadas:</h3>
        <ul>
          {selectedDates.map((date, index) => (
            <li key={index}>{date.fecha} - {date.stock} cervezas seleccionadas</li>
          ))}
        </ul>
      </div>

      <div className="quantity-container">
        <h3>Selecciona la cantidad de cervezas:</h3>
        <div className="quantity-controls">
          <button 
            className="quantity-btn" 
            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
          >
            -
          </button>
          <input
            type="number"
            className="quantity-input"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <button 
            className="quantity-btn" 
            onClick={() => setQuantity(prev => prev + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar2;