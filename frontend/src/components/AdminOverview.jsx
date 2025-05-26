import React, { useEffect, useState } from 'react';
import './AdminStyle.css';

/**
 * AdminOverview component displays an overview of all car rentals and total revenue.
 * @component
 * @returns {JSX.Element}
 */
const AdminOverview = () => {
    /**
     * @type {[Array, Function]} rentals - List of all rentals from backend and setter.
     */
    const [rentals, setRentals] = useState([]);
    /**
     * @type {[Array, Function]} cars - List of all cars from backend and setter.
     */
    const [cars, setCars] = useState([]);

    // Fetch rentals and cars from backend when component mounts
    useEffect(() => {
        fetch('/api/rentals')
            .then(res => res.json())
            .then(data => setRentals(data));
        fetch('/api/cars')
            .then(res => res.json())
            .then(data => setCars(data));
    }, []);

    /**
     * Calculates the total revenue from all rentals.
     * @type {number}
     */
    const totalRevenue = rentals.reduce((sum, r) => sum + (r.revenue || 0), 0);

    /**
     * Gets the car name for a given carId.
     * @param {number|string} carId 
     * @returns {string} 
     */
    const getCarName = (carId) => {
        const car = cars.find(car => String(car.id) === String(carId));
        return car ? car.name : 'Okänd bil';
    };

    // Render the admin overview table
    return (
        <div>
         
            <h2 className="admin-header">Booking overview</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Car</th>
                        <th>Name</th>
                        <th>From</th>
                        <th>To</th>
                        <th>Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {rentals.map(r => (
                        <tr key={r.id}>
                            <td>{getCarName(r.carId)}</td>
                            <td>{r.driverName}</td>
                            <td>{r.fromDate}</td>
                            <td>{r.toDate}</td>
                            <td>{r.revenue} kr</td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={4} style={{ fontWeight: 'bold', textAlign: 'right' }}>Total revenue:</td>
                        <td style={{ fontWeight: 'bold' }}>{totalRevenue} kr</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default AdminOverview;