import './component.css';

/**
 * BookingSummary component displays a summary of the current booking.
 * @component
 * @param {Object} props
 * @param {string} props.name 
 * @param {string|number} props.selectedCar 
 * @param {string} props.pickupDate 
 * @param {string} props.returnDate 
 * @param {string} props.personnummer 
 * @param {Array} props.cars 
 * @returns {JSX.Element}
 */
const BookingSummary = ({ name, selectedCar, pickupDate, returnDate, personnummer, cars }) => {
    // Find the selected car object
    const car = cars.find(c => String(c.id) === selectedCar);

    /**
     * Calculates the number of days between two dates.
     * @param {string} start 
     * @param {string} end 
     * @returns {number}
     */
    const getDaysBetween = (start, end) => {
        if (!start || !end) return 0;
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diffTime = endDate - startDate;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    };

    const days = getDaysBetween(pickupDate, returnDate);

    // Calculate price per day and total price
    const pricePerDay = car ? car.pricePerDay : 0;
    const totalPrice = days * pricePerDay;

    //return the booking summary component
    return (
        <div className="booking-summary">
            <h3>📝 Booking Summary</h3>
            <p>
                <strong>Car:</strong> {car ? car.name : <span className="not-selected">Not selected</span>}
            </p>
            <p>
                <strong>Price per day:</strong> {car ? `${car.pricePerDay} SEK` : <span className="not-selected">Not selected</span>}
            </p>
            <p>
                <strong>Pickup date:</strong> {pickupDate || <span className="not-selected">Not selected</span>}
            </p>
            <p>
                <strong>Return date:</strong> {returnDate || <span className="not-selected">Not selected</span>}
            </p>
            <p>
                <strong>Name:</strong> {name || <span className="not-selected">Not entered</span>}
            </p>
            <p>
                <strong>Securitynumber:</strong> {personnummer || <span className="not-selected">Not entered</span>}
            </p>
            <p>
                <strong>Number of days:</strong> {days > 0 ? days : <span className="not-selected">Not calculated</span>}
            </p>
            <p>
                <strong>Total cost:</strong> {totalPrice > 0 ? `${totalPrice} SEK` : <span className="not-selected">Not calculated</span>}
            </p>
        </div>
    );
};

export default BookingSummary;