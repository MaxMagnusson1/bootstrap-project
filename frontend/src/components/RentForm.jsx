import React, { Component } from 'react';
import CarSelect from './CarSelect';
import DatePicker from './DatePicker';
import ErrorMessage from './ErrorMessage';
import PersonnummerInput from './PersonnummerInput';
import BookingSummary from './BookingSummary';
import NameInput from './NameInput';

/**
 * Class declaration, representing the RentForm component.
 * @class RentForm
 * @extends Component
 */
class RentForm extends Component {
      /**
     * Component state.
     * @type {Object}
     * @property {Array} cars 
     * @property {string} selectedCar 
     * @property {string} pickupDate 
     * @property {string} returnDate 
     * @property {string} validationError 
     * @property {string} personnummer 
     * @property {boolean} isPersonnummerValid
     * @property {boolean} bookingConfirmed 
     * @property {Object|null} bookingData 
     * @property {Object} fieldErrors 
     * @property {string} name 
     * @property {boolean} isNameValid 
     */
    state = {
        cars: [],
        selectedCar: '',
        pickupDate: '',
        returnDate: '',
        validationError: '',
        personnummer: '',
        isPersonnummerValid: false,
        bookingConfirmed: false,
        bookingData: null,
        fieldErrors: {},
        name: '',
        isNameValid: false
    };

     /**
     * Fetches the list of cars from backend when component mounts.
     * @returns {Promise<void>}
     */

    async componentDidMount() {
        const response = await fetch('/api/cars');
        const cars = await response.json();
        this.setState({ cars });
    }

    /**
     * Handles car selection and fetches unavailable dates for the selected car.
     * @param {Object} event - The change event from the car select input.
     * @returns {Promise<void>}
     */
        handleCarChange = async (event) => {
        const selectedCar = event.target.value;
        this.setState({ selectedCar, unavailableDates: [] });

        // Fetch unavailable dates for the selected car from backend
        const response = await fetch(`/api/rentals/availability?carId=${selectedCar}`);
        const unavailableDates = await response.json();
        this.setState({ unavailableDates });
        };

         /**
          * Handles pickup date change.
          * @param {Object} event 
         */
            handlePickUpDateChange = (event) => {
                this.setState({ pickupDate: event.target.value });
            };

             /**
             * Handles name input change.
             * @param {string} value 
             */
            handleNameChange = (value) => {
                this.setState({ name: value });
            };

            /**
             * Handles name validation result.
             * @param {boolean} isValid 
             */
            handleNameValidation = (isValid) => {
                this.setState({ isNameValid: isValid });
            };
            
              /**
             * Handles return date change and validates it against pickup date.
             * @param {Object} event 
             */
            handleReturnDateChange = (event) => {
                const returnDate = event.target.value;
                const { pickupDate } = this.state;

                if (pickupDate && new Date(returnDate) <= new Date(pickupDate)) {
                    this.setState({ validationError: 'Returndate needs to be after pickup date', returnDate: '' });
                } else {
                    this.setState({ returnDate, validationError: '' });
                }
            };

            /**
             * Handles security number input change.
             * @param {string} value 
             */
            handlePersonnummerChange = (value) => {
                this.setState({ personnummer: value });
            };

             /**
             * Handles security number validation result.
             * @param {boolean} isValid 
             */
            handlePersonnummerValidation = (isValid) => {
                this.setState({ isPersonnummerValid: isValid });
            };


             /**
             * Handles booking logic, validates fields, and sends booking to backend.
             * @returns {Promise<void>}
             */
            handleBooking = async () => {
                const { name, selectedCar, pickupDate, returnDate, personnummer, cars } = this.state;

                 // Validate all fields and collect error messages
                let fieldErrors = {};
                if (!name) fieldErrors.name = "You need to write your name";
                if (!selectedCar) fieldErrors.selectedCar = "You need to choose a car";
                if (!pickupDate) fieldErrors.pickupDate = "You need to choose a pickup date";
                if (!returnDate) fieldErrors.returnDate = "You need to choose a return date";
                if (!personnummer) fieldErrors.personnummer = "You need to enter a security number";

                if (Object.keys(fieldErrors).length > 0) {
                    this.setState({ fieldErrors });
                    return;
                }
                
                //Find selected car and calculate total revenue
                const car = cars.find(c => String(c.id) === selectedCar);

                /**
                 * Calculates the number of days between two dates.
                 * @param {string} start 
                 * @param {string} end 
                 * @returns {number}
                 */
                const getDaysBetween = (start, end) => {
                    const startDate = new Date(start);
                    const endDate = new Date(end);
                    const diffTime = endDate - startDate;
                    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                };
                const days = getDaysBetween(pickupDate, returnDate);
                const totalRevenue = days * (car ? car.pricePerDay : 0);

                //Send booking to backend
                try {
                    const response = await fetch('/api/rentals', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            carId: car.id,
                            driverName: name,
                            personalNumber: personnummer,
                            fromDate: pickupDate,
                            toDate: returnDate,
                            revenue: totalRevenue
                        })
                    });

                    // Handle specific error cases, if the car is already booked for the selected dates this alert will be shown.
                    if (response.status === 409){
                        window.alert("Car is already booked for atleast on of the selected dates!");
                        return;
                    }

                    // If booking is successful, update state show an alert 
                    if (response.ok) {
                        this.setState({
                            bookingConfirmed: true,
                            bookingData: {
                                carId: car.id,
                                driverName: name,
                                personalNumber: personnummer,
                                fromDate: pickupDate,
                                toDate: returnDate,
                                revenue: totalRevenue
                            },

                            selectedCar: '',
                            pickupDate: '',
                            returnDate: '',
                            personnummer: '',
                            isPersonnummerValid: false,
                            fieldErrors: {},
                            name: '',
                            isNameValid: false,
                            unavailableDates: [],

                        }, () => {
                            window.alert("Booking completed!");
                        });
                    } else {   
                     window.alert("Booking failed!");  
                    }
                } catch (error) {
                    window.alert("Booking failed!");
                }
            };

             /**
             * Checks if the booking button should be enabled.
             * @returns {boolean} 
             */
            isBookingValid = () => {
                const { selectedCar, pickupDate, returnDate, isPersonnummerValid } = this.state;
                const allSet = selectedCar && pickupDate && returnDate && isPersonnummerValid;
                const datesValid = new Date(returnDate) > new Date(pickupDate);
                return allSet && datesValid;
            };

            // Render method to display the form and booking summary.
            render() {
                const { cars, selectedCar, pickupDate, returnDate, validationError, fieldErrors, personnummer } = this.state;
                
                /**
                 * Returns the minimum allowed return date 
                 * @param {string} pickupDate 
                 * @returns {string} 
                 */
                const getMinReturnDate = (pickupDate) => {
                    if (!pickupDate) return '';
                    const date = new Date(pickupDate);
                    date.setDate(date.getDate() + 1);
                    return date.toISOString().split('T')[0];
                };
                
                //Returns everything that should be rendered in the component, in the correct order.
                return (
                    <>
                        <p className="header-text">
                            Welcome to fortnox car rental
                        </p>
                        <div className="main-layout">
                            <div className="form-section">
                                <p className="car-text">
                                    Choose your car
                                </p>
                            
                                <CarSelect
                                    id="car-select"
                                    cars={cars}
                                    selectedCar={selectedCar}
                                    onChange={this.handleCarChange}
                                />
                                <ErrorMessage message={fieldErrors.selectedCar} />
                            <p className="car-text">
                                    Choose an pick up and return date
                                </p>
                                <div className="date-pickers-row">
                                    <div>
                                        <DatePicker
                                        label="Choose pickup day"
                                        value={pickupDate}
                                        onChange={this.handlePickUpDateChange}
                                        minDate={new Date().toISOString().split('T')[0]}
                                        highlightDates={this.state.unavailableDates}
                                        />
                                        <ErrorMessage message={fieldErrors.pickupDate} />
                                    </div>
                                    <div>
                                        <DatePicker
                                            label="Choose return day"
                                            value={returnDate}
                                            onChange={this.handleReturnDateChange}
                                            minDate={getMinReturnDate(pickupDate)}
                                            highlightDates={this.state.unavailableDates}
                                        />
                                        <ErrorMessage message={fieldErrors.returnDate} />
                                    </div>
                                </div>
                                <p className="car-text">
                                    Enter name and Securitynumber
                                </p>

                                <div className="name-personnummer-row">
                                    <div>
                                        <NameInput
                                            value={this.state.name}
                                            onChange={this.handleNameChange}
                                            onValid={this.handleNameValidation}
                                        />
                                        <ErrorMessage message={fieldErrors.name} />
                                    </div>
                                    <div>
                                        <PersonnummerInput 
                                            value={this.state.personnummer}
                                            onChange={this.handlePersonnummerChange}
                                            onValid={this.handlePersonnummerValidation}
                                        />
                                        <ErrorMessage message={fieldErrors.personnummer} />
                                    </div>
                                </div>
                            </div>
                            <div className="summary-section">
                                <BookingSummary
                                    name={this.state.name}
                                    selectedCar={selectedCar}
                                    pickupDate={pickupDate}
                                    returnDate={returnDate}
                                    personnummer={personnummer}
                                    cars={cars}
                                />
                                <button
                                    onClick={this.handleBooking}
                                    className={
                                        "booking-button " +
                                        (this.isBookingValid() ? "enabled" : "disabled")
                                    }
                                >
                                    Boka bil
                                </button>
                            </div>
                        </div>
                    </>
                );
            }}
export default RentForm;