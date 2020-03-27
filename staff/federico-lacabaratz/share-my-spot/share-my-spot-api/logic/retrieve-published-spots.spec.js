require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Spot } } = require('share-my-spot-data')
const { expect } = require('chai')
const { random } = Math
const retrievePublishedSpots = require('./retrieve-published-spots')

describe('retrievePublishedSpots', () => {
    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Spot.deleteMany()]))
    )

    let name, surname, email, phone, password, title, description, date, location

    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        phone = 123456+`${random()}`
        password = `password-${random()}`
        title = `title-${random()}`
        description = `description-${random()}`
        date = new Date
        location = `location-${random()}`
    })

    describe('when user already exists', () => {
        let _id, _other

        beforeEach(() =>
            User.insertMany([
                { name, surname, email, phone, password },
                { name, surname, email, phone, password }
            ])
                .then(([{ id }, { id: other }]) => {
                    _id = id
                    _other = other
                })
                .then(() => {
                    const spots = []

                    const now = new Date

                    date = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate())

                    for (let i = 0; i < 20; i++)
                        spots.push({ publisher: i < 10 ? _id : _other, title, description, date, location })

                    return Spot.insertMany(spots)
                })
        )

        it('should succeed on correct and valid and right data', () =>
            retrievePublishedSpots(_id)
                .then(spots => {
                    expect(spots).to.exist
                    expect(spots).to.have.lengthOf(10)

                    spots.forEach(spot => {
                        expect(spot.id).to.be.a('string')
                        expect(spot._id).to.be.undefined
                        expect(spot.title).to.equal(title)
                        expect(spot.description).to.equal(description)
                        expect(spot.date).to.deep.equal(date)
                        expect(spot.location).to.equal(location)
                        expect(spot.publisher).to.be.a('string')
                        expect(spot.publisher).to.equal(_id)
                    })
                })
        )
    })

    // TODO more happies and unhappies

    after(() => Promise.all([User.deleteMany(), Spot.deleteMany()]).then(() => mongoose.disconnect()))
})