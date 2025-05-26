import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import './component.css'; 
import { format, isBefore } from "date-fns";

/**
 * DatePicker component displays a calendar for selecting a date.
 * Booked dates are highlighted and disabled.
 * @component
 * @param {Object} props
 * @param {string} props.label 
 * @param {string} props.value 
 * @param {Function} props.onChange 
 * @param {string} props.minDate 
 * @param {Array} [props.highlightDates=[]] 
 */
const DatePicker = ({ label, value, onChange, minDate, highlightDates = [] }) => {
  // Convert value to Date object for DayPicker
  const selected = value ? new Date(value) : undefined;

  // Convert highlightDates to Date objects
  const bookedDates = Array.isArray(highlightDates)
    ? highlightDates.map(d => typeof d === "string" ? new Date(d) : d)
    : [];

  /**
   * Handles date selection.
   * Ignores selection if date is before minDate or is booked.
   * @param {Date} day - The selected day.
   */
  const handleSelect = (day) => {
    if (!day) return;
    if (minDate && isBefore(day, new Date(minDate))) return;
    if (bookedDates.some(d => d.toDateString() === day.toDateString())) return;
    onChange({ target: { value: format(day, "yyyy-MM-dd") } });
  };

  // Modifiers for styling booked and selected dates
  const modifiers = {
    booked: bookedDates
  };

  const modifiersClassNames = {
    selected: "custom-selected-date",
    booked: "custom-booked-date"     
  };

  return (
    <div className="kalender">
      
      {label && <span className="font-medium">{label}</span>}

      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleSelect}
        fromDate={minDate ? new Date(minDate) : undefined}
        showOutsideDays
        modifiers={modifiers}
        modifiersClassNames={modifiersClassNames}
        disabled={bookedDates}
      />
    </div>
  );
};

export default DatePicker;