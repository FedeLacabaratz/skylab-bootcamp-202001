import { validate } from 'share-my-spot-utils'
import context from './context'
const { NotAllowedError } = require('share-my-spot-errors')
require('dotenv').config()

const API_URL = process.env.REACT_APP_API_URL

export default (function () {
    
    return (async () => {
        const res = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token },
        })

        const { status } = res

        if (status === 200){
            const user = await res.json()

            return user
        }

        if (status >= 400 && status < 500) {

            const { error } = await res.json()

            if (status === 401) {
                throw new NotAllowedError(error)
            }

            throw new Error(error)

        }
        throw new Error('server error')

    })()
}).bind(context)