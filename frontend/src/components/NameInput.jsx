import { useState } from 'react';
import './component.css';

/**
 * Checks if the provided name is valid.
 * @param {string} name 
 * @returns {boolean}
 */
const isValidName = (name) => {
    return !!name && name.trim().length > 1 && !/^\d+$/.test(name);
};

/**
 * NameInput component for entering and validating a user's name.
 * @component
 * @param {Object} props
 * @param {string} props.value 
 * @param {Function} props.onChange 
 * @param {Function} props.onValid 
 * @returns {JSX.Element}
 */
const NameInput = ({ value, onChange, onValid }) => {
    // Local state for error message
    const [error, setError] = useState('');

    /**
     * Handles blur event
     * Validates the name and updates error state
     */
    const handleBlur = () => {
        if (!isValidName(value)) {
            setError('Please enter a valid name (not only numbers, at least 2 characters).');
            onValid(false);
        } else {
            setError('');
            onValid(true);
        }
    };

    return (
        <div>
            <label className="name_input">
                Name:
                <input
                    type="text"
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    onBlur={handleBlur}
                    placeholder="Your name"
                    required
                    className="name_input"
                />
            </label>
      
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default NameInput;