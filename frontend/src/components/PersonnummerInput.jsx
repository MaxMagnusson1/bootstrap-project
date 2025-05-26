import { useState } from 'react';
import './component.css';

/**
 * Checks if the personal number has a valid format
 * @param {string} pnr 
 * @returns {boolean} 
 */
const isValidFormat = (pnr) => /^\d{8}[-]?\d{4}$/.test(pnr);

/**
 * Validates the  personal number using the Luhn algorithm.
 * @param {string} pnr 
 * @returns {boolean} 
 */
const isValidPersonnummer = (pnr) => {
    const cleaned = pnr.replace('-', '');
    if (!/^\d{12}$/.test(cleaned)) return false;

    const digits = cleaned.slice(2, 11).split('').map(Number);
    const checkDigit = parseInt(cleaned[11]);

    let sum = 0;
    for (let i = 0; i < digits.length; i++) {
        let val = digits[i];
        if (i % 2 === 0) {
            val *= 2;
            if (val > 9) val -= 9;
        }
        sum += val;
    }

    const calculatedCheckDigit = (10 - (sum % 10)) % 10;

    return calculatedCheckDigit === checkDigit;
};

/**
 * Calculates the age from the personal number.
 * @param {string} pnr
 * @returns {number}
 */
const getAge = (pnr) => {
    const cleaned = pnr.replace('-', '');
    const year = parseInt(cleaned.substring(0, 4), 10);
    const month = parseInt(cleaned.substring(4, 6), 10) - 1;
    const day = parseInt(cleaned.substring(6, 8), 10);
    const birthDate = new Date(year, month, day);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};

/**
 * PersonnummerInput component for entering and validating a Swedish personal number.
 * @component
 * @param {Object} props
 * @param {string} props.value
 * @param {Function} props.onChange 
 * @param {Function} props.onValid 
 * @returns {JSX.Element}
 */
const PersonnummerInput = ({ value, onChange, onValid }) => {
    // Local state for error message
    const [error, setError] = useState('');

    /**
     * Handles blur event (when input loses focus).
     * Validates the personal number and updates error state and validity.
     */
    const handleBlur = () => {
        if (!isValidFormat(value)) {
            setError('Invalid format. Use YYYYMMDD-XXXX or without hyphen.');
            onValid(false);
            return;
        }

        if (!isValidPersonnummer(value)) {
            setError('Personumber not valid');
            onValid(false);
            return;
        }

        const age = getAge(value);
        if (age < 18) {
            setError('Driver needs to be atleast 18');
            onValid(false);
        } else {
            setError('');
            onValid(true);
        }
    };

    //return the input field 
    return (
        <div>
            <label className="personnummer_input">
                Securitynumber:
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onBlur={handleBlur}
                    placeholder="t.ex. 20000101-1234"
                    required
                    className="personnummer_input"
                />
            </label>
            {error && <p className="error">{error}</p>}
        </div>
    );
};

export default PersonnummerInput;