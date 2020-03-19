require('dotenv').config()

const { env: { TEST_MONGODB_URL } } = process
const { mongoose, models: { User, Spot } } = require('share-my-spot-data')
const { expect } = require('chai')
const { random } = Math
const deleteSpot = require('./delete-spot')

describe('deleteSpot', () => {

    let publisherId, title, description, addressLocation, addressStNumber, addressOther, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun, length, width, height, area, price, acceptsBarker, surveillance, isCovered

    before(() =>
        mongoose.connect(TEST_MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => Promise.all([User.deleteMany(), Spot.deleteMany()]))
    )


    beforeEach(() => {
        name = `name-${random()}`
        surname = `surname-${random()}`
        email = `email-${random()}@mail.com`
        password = `password-${random()}`

        title = `title-${random()}`
        addressLocation = `addressLocation-${random()}`
        addressStNumber = `addressStNumber-${random()}`
        addressOther = `addressOther-${random()}`
        length = 4.5
        width = 2.22
        height = 2.4
        area = 10
        description = `description-${random()}`
        price = 2
        acceptsBarker = true
        surveillance = false
        isCovered = true
        hourStarts = 9
        hourEnds = 18
        mon = true
        tue = true
        wed = true
        thu = true
        fri = true
        sat = false
        sun = false
    })

    describe('when user already exists', () => {

        beforeEach(() => 
            Promise.all([User.create({ name, surname, email, password }), Spot.create({_id, title, addressLocation, addressStNumber, addressOther, length, width, height, area, description, price, acceptsBarker, surveillance, isCovered, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun }) ])
                .then(([user, spot]) => {
                    _id = user.id
                    _spotId = spot.id
                    user.save()
                    return spot.save()
                })
                .then(() => {})
                )

        it('should succeed on correct and valid and right data', () =>
            User.findById(_id)
                .then((user) => {
                    expect(user.id).to.exist
                })

                .then(() => deleteSpot(_id, _spotId)
                    .then(() => User.findById(_id).lean())
                    .then((user) => {
                        expect(user).to.exist
                        expect(user.publishedSpots).to.be.undefined
                    })
                )
        )

        it('should fail if the Spot does not exist', () => {
            _spotId = `${_spotId}-wrong`
            deleteSpot(_id, _spotId)
                .then(() => { throw new Error('should not reach this point') })
                .catch(({ message }) => {
                    expect(message).to.exist

                    expect(message).to.equal(`Spot with name ${_spotId} not found`)

                })
        })

    })

    describe('unhappy path', () => {

        it('should fail on a non-string id', () => {
            let userId

            userId = 12345
            expect(() => deleteSpot(userId, )).to.throw(TypeError, `userId ${userId} is not a string`)

            userId = false
            expect(() => deleteSpot(userId, )).to.throw(TypeError, `userId ${userId} is not a string`)

            userId = undefined
            expect(() => deleteSpot(userId, )).to.throw(TypeError, `userId ${userId} is not a string`)

            userId = []
            expect(() => deleteSpot(userId, )).to.throw(TypeError, `userId ${userId} is not a string`)

        })

        it('should fail on a non-string spotId', () => {

            userId = 'fede'
            spotId = 12345
            expect(() => deleteSpot(userId, spotId)).to.throw(TypeError, `spotId ${spotId} is not a string`)

            spotId = false
            expect(() => deleteSpot(userId, spotId)).to.throw(TypeError, `spotId ${spotId} is not a string`)

            spotId = undefined
            expect(() => deleteSpot(userId, spotId)).to.throw(TypeError, `spotId ${spotId} is not a string`)

            spotId = []
            expect(() => deleteSpot(userId, spotId)).to.throw(TypeError, `spotId ${spotId} is not a string`)
        })
    })

    after(() => Promise.all([User.deleteMany(), Spot.deleteMany()]).then(() => mongoose.disconnect()))
})