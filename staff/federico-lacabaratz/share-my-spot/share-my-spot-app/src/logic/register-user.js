import { validate } from 'share-my-spot-utils'
const { NotAllowedError } = require('share-my-spot-errors')
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

export default function (name, surname, email, phone, password) {
    validate.string(name, 'name')
    validate.string(surname, 'surname')
    validate.string(email, 'email')
    validate.email(email)
    validate.type(phone, 'phone', Number)
    validate.string(password, 'password')

    return (async () => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, email, phone, password })
        })

        const { status } = response

        if (status === 201) return

        if (status >= 400 && status < 500) {
            const { error } = await response.json()

            if (status === 409) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)
        }

        throw new Error('server error')
    })()
}