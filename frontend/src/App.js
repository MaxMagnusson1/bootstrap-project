import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RentForm from './components/RentForm';
import AdminOverview from './components/AdminOverview';

/**
 * App component sets up the main routing for the application.
 * @component
 * @returns {JSX.Element}
 */
class App extends React.Component {
    render() {
        return (
            <Router>
                <Routes>
                    
                    <Route path="/rent" element={<RentForm />} />
                    
                    <Route path="/admin" element={<AdminOverview />} />
                    
                    <Route path="*" element={<div>404 Not Found</div>} />
                </Routes>
            </Router>
        );
    }
}

export default App;