import React, { useState, useEffect, useContext } from 'react'
import { Register, Login, Search, Header } from '../components'
import { registerUser, login, isLoggedIn, retrieveUser } from '../logic'
import { Context } from './ContextProvider'
import { Route, withRouter, Redirect } from 'react-router-dom'

export default withRouter(function ({ history }) {

  const [state, setState] = useContext(Context)
  const [user, setUser] = useState([])

  useEffect(() => {
    if (isLoggedIn()) {
      
        history.push('/search')
      
    } else {
      history.push('/login')
    }
  }, [])

  const handleRegister = (name, surname, email, password) => {
    (async () => {
      try {
        await registerUser(name, surname, email, password)
        
        history.push('/login')

      } catch ({ message }) {
        setState({ error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }

    })()
  }

  const handleLogin = (email, password) => {
    (async () => {
      try {
        await login(email, password)

        const user = await retrieveUser()

        setUser(user)

        history.push('/search')

      } catch ({ message }) {
        setState({ ...state, error: message })

        setTimeout(() => {
          setState({ error: undefined })
        }, 3000)
      }
    })()
  }

  const { error } = state

  return <div className="App">
    <Route exact path='/' render={() => isLoggedIn() ? <Redirect to='/search' /> : <Redirect to='/login' />} />
    <Route path='/register' render={() => isLoggedIn() ? <Redirect to='/search' /> : <Register onRegister={handleRegister} error={error} /> } />
    <Route path='/login' render={() => isLoggedIn() ? <Redirect to='/search' /> : <Login onLogin={handleLogin} error={error} />} />
    <Route path='/search' render={() => isLoggedIn() ? <><Header /><Search /></> : <Redirect to='/login' />} />

  </div>
})
