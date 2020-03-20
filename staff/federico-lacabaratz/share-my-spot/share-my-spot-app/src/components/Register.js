import React from 'react'
import logo from '../images/logo.png'
import './Register.sass'
import Feedback from './Feedback'
import { withRouter } from 'react-router-dom'

export default withRouter (function ({ onRegister, history, error }) {
    function handleOnRegister(event) {
        event.preventDefault()

        const name = event.target.name.value
        const surname = event.target.surname.value
        const email = event.target.email.value
        const password = event.target.password.value

        onRegister(name, surname, email, password)
    }

    const handleGoToLogin = (event) => {
        event.preventDefault()

        history.push('/login')
    }

    return <>
        <form className="register" onSubmit={handleOnRegister}>
            <img className="register__logo" src={logo} alt="ShareMySpotLogo" />
            <h2 className="register__title">Sign-Up</h2>
            <input className="register__input" type="text" name="name" placeholder="name" />
            <input className="register__input" type="text" name="surname" placeholder="surname" />
            <input className="register__input" type="text" name="email" placeholder="email" />
            <input className="register__input" type="password" name="password" placeholder="password" />
            <button className="register__submit">Register</button>
            <a className="register__login" href="" onClick={handleGoToLogin}>Already registered? - Go To Login</a>
            {error && <Feedback message={error} level="warn" />}
        </form>
    </>
})