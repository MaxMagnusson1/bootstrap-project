/**
 * ErrorMessage component displays a validation error message if one exists.
 * @component
 * @param {Object} props
 * @param {string} props.message 
 * @param {string} [props.id] 
 * @returns {JSX.Element|null} 
 */
const ErrorMessage = ({ message, id }) => {
    // If there is no message, render nothing
    if (!message) return null;
    // Otherwise, render the error message styled in red
    return (
        <p
            className="error-message"
            style={{ color: 'red', marginLeft: '2rem' }}
            id={id} 
        >
            {message}
        </p>
    );
};

export default ErrorMessage;