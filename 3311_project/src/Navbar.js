

import React,{useState} from 'react'
import {Link} from 'react-router-dom';
import './Navbar.css';


export default function Navbar() 
{
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);//set opposite of click

    const closeMobileMenu = () => setClick(false);
    

    return (
        <>
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                   MACRO MEAL <i class="fas fa-dumbbell"/>
                </Link> 
                <div className="menu-icon" onClick={handleClick}>
                    <i className={click ? 'fas fa-times': 'fas fa-bars'} />    
                </div> 
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className = 'nav-item '>
                        <Link to='/Home' className='nav-links' onClick={closeMobileMenu}>
                            Home
                        </Link>
                    </li>
                    <li className = 'nav-item '>
                        <Link to='/MacroCalculator' className='nav-links' onClick={closeMobileMenu}>
                            Macro Calculator
                        </Link>
                    </li>
                    <li className = 'nav-item '>
                        <Link to='/SampleMeal' className='nav-links' onClick={closeMobileMenu}>
                            Sample Meal
                        </Link>
                    </li>
                </ul>
                
            </div>
        </nav>
        </>
    )
}
