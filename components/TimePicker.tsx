import React, { useState } from "react";

interface TimePickerProps {
  selected: Date;
  onChange: (newDate: Date) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ selected, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Extract hours and minutes from the selected Date
  const hours = selected.getHours();
  const minutes = selected.getMinutes();

  const handleTimeChange = (type: "hour" | "minute", value: string) => {
    const newDate = new Date(selected);
    if (type === "hour") {
      newDate.setHours(Number(value));
    } else if (type === "minute") {
      newDate.setMinutes(Number(value));
    }
    onChange(newDate); // Call the onChange prop to update the parent state
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-72 px-4 py-2 border rounded-md bg-dark-2 text-white text-left flex items-center justify-between"
      >
        <span className="text-muted-foreground">
          {hours < 10 ? `0${hours}` : hours}:{minutes < 10 ? `0${minutes}` : minutes}
        </span>
        <span className="ml-2 text-gray-400">&#x23F3;</span>
      </button>

      {isOpen && (
        <div className="absolute mt-2 p-4 bg-dark-2 text-white shadow-lg rounded-md z-10 w-72">
          <label className="block text-gray-300 mb-2" htmlFor="time-input">
            Select Time:
          </label>
          <div className="flex space-x-2">
            {/* Hour Input */}
            <input
              type="number"
              id="hour-input"
              value={hours}
              onChange={(e) => handleTimeChange("hour", e.target.value)}
              className="w-1/3 px-3 py-2 rounded-md bg-dark-3 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="HH"
              min={0}
              max={23}
            />
            <span className="text-gray-300 text-xl">:</span>
            {/* Minute Input */}
            <input
              type="number"
              id="minute-input"
              value={minutes}
              onChange={(e) => handleTimeChange("minute", e.target.value)}
              className="w-1/3 px-3 py-2 rounded-md bg-dark-3 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="MM"
              min={0}
              max={59}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TimePicker;
