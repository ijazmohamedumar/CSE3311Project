import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {useHistory} from 'react-router-dom';
import './Homepage.css';


function Homepage() 
{
    const history = useHistory();

    const MacroPage = () =>
    (
        history.push("/MacroCalculator")
    );
    const MealPage = () =>
    (
        history.push("/SampleMeal")
    );
    return (
        <Router>
            <nav className="header">   
                <div className = "navbar-container">
                    <Link to="/" className="navbar-logo">
                        MACRO MEAL <i className="fas fa-dumbbell"/>
                    </Link>
                </div>
            </nav>
            <div className="Title">
                <h1>Welcome to Macro Meal!</h1>
                <h3>Quick and easy way to get fit and achieve your body goals</h3>
                <h3>We provide a simple solution to meal planning and dieting</h3>
            </div>
            <div className="btn__section">
                <Link to='/MacroCalculator'>
                    <button className="btn__macro" onClick={MacroPage}>Calculate Macros</button>
                </Link>
                <Link to='/SampleMeal'> 
                    <button className="btn__meal" onClick={MealPage}>View Sample Meal</button>
                </Link>
            </div>
        </Router>
        
    )
}

export default Homepage