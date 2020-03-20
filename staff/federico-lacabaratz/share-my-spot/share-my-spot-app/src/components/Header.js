import React, { useState } from 'react'
import './Header.sass'
import logo from '../images/logo.png'

export default () => {

    const [menu, setMenu] = useState('closed')

    const handleOpenNav = (event) => {
        event.preventDefault()
        
        setMenu('opened')
    }

    return <header className="header">
        <div className='sidepanel'>
            <a href="javascript:void(0)" className="closebtn" onclick="closeNav()">X</a>
            <a href="#">New Search</a>
            <a href="#">Add a Listing</a>
            <a href="#">Your Listings</a>
            <a href="#">Manage Your Requests</a>
            <a href="#">Your Bookings</a>
            <a href="#">Your Favourites</a>
        </div>
        <i onclick={handleOpenNav} className="openbtn fas fa-bars"></i>
        {/* <script>
            {function openNav() {
                document.getElementById("mySidepanel").style.width = "250px"
            },

            function closeNav() {
                document.getElementById("mySidepanel").style.width = "0"
            }}
            </script> */}
        <div className="header__logo">
            <img className="header__logo__img" src={logo} alt="ShareMySpotLogo" />
        </div>
        <div className="header__account">
            <i className="header__account__logout fas fa-power-off"></i>
            <i className="header__account__user fas fa-user"></i>
        </div>
    </header>

}
