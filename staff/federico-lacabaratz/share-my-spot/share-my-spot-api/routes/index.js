const { Router } = require('express')
const {
    registerUser,
    authenticateUser,
    retrieveUser,
    updateUser,
    createSpot,
    findAvailableSpots,
    retrievePublishedSpots,
    updateSpot,
    deleteSpot,
    saveSpotPhoto,
    retrieveSpotPhoto,
    bookSpot,
    acceptBooking,
    declineBooking
} = require('./handlers')

const { jwtVerifierMidWare } = require('../mid-wares')
const bodyParser = require('body-parser')
const jsonBodyParser = bodyParser.json()

const router = new Router()

router.post('/users', jsonBodyParser, registerUser)

router.post('/users/auth', jsonBodyParser, authenticateUser)

router.get('/users', jwtVerifierMidWare, retrieveUser)

router.patch('/users', [jwtVerifierMidWare, jsonBodyParser], updateUser)

router.post('/spots', [jwtVerifierMidWare, jsonBodyParser], createSpot)

router.get('/spots', jwtVerifierMidWare, retrievePublishedSpots)

router.get('/find-available-spots', findAvailableSpots)

router.patch('/update-spot/:spotId', [jwtVerifierMidWare, jsonBodyParser], updateSpot)

router.delete('/delete-spot/:spotId', [jwtVerifierMidWare, jsonBodyParser], deleteSpot)

router.post('/upload/:spotId', jwtVerifierMidWare, saveSpotPhoto)

router.get('/load/:spotId', retrieveSpotPhoto)

router.post('/:spotId/spots/:candidateId/book', [jwtVerifierMidWare, jsonBodyParser], bookSpot)

router.patch('/spots/:spotId/candidate/:candidateId/accept', [jwtVerifierMidWare, jsonBodyParser], acceptBooking)

router.patch('/spots/:spotId/candidate/:candidateId/decline', [jwtVerifierMidWare, jsonBodyParser], declineBooking)

module.exports = router

