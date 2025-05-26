import React from 'react';
import './component.css';

/**
 * CarSelect component displays a list of cars for selection.
 * @component
 * @param {Object} props
 * @param {Array} props.cars 
 * @param {string|number} props.selectedCar 
 * @param {Function} props.onChange 
 * @returns {JSX.Element}
 */
const CarSelect = ({ cars, selectedCar, onChange }) => {
  /**
   * Handles click on a car option.
   * Calls onChange with a synthetic event containing the selected car id.
   * @param {string|number} carId 
   */
  const handleClick = (carId) => {
    onChange({ target: { value: String(carId) } });
  };

  return (
    <div className="car-select-container">
      {/* Render each car as a selectable option */}
      {cars.map(car => (
        <div
          key={car.id}
          className={`car-option${String(car.id) === selectedCar ? ' selected' : ''}`}
          onClick={() => handleClick(car.id)}
        >
          {car.name}, {car.pricePerDay} kr/day
        </div>
      ))}
    </div>
  );
};

export default CarSelect;