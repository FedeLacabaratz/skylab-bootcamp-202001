import { validate } from 'share-my-spot-utils'
import { NotAllowedError } from 'share-my-spot-errors'
import context from './context'
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

export default (function (body) {

    const {email, phone, password, oldPassword} = body

    if (email) {
        validate.string(email, 'email')
        validate.email(email)
        if (!email.trim().length) throw new Error(`email is empty or blank`)
    }

    if (phone) {
        validate.type(phone, 'phone', Number)
    }

    if (password) {
        validate.string(password, 'password')
        if (!password.trim().length) throw new Error(`password is empty or blank`)
    }

    if (oldPassword) {
        validate.string(oldPassword, 'oldPassword')
        if (!oldPassword.trim().length) throw new Error(`oldPassword is empty or blank`)
    }    

    return (async () => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer ' + this.token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })

        const { status } = response

        if (status === 200) return

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()

}).bind(context)