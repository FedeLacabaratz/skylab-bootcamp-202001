require('dotenv').config()
const { expect } = require('chai')
const { random } = Math
const { mongoose, models: { User, Spot } } = require('share-my-spot-data')
const createSpot = require('./create-spot')
var chai = require('chai')
chai.use(require('chai-fs'))
const path = require('path')
const { ContentError } = require('share-my-spot-errors')

const { env: { TEST_MONGODB_URL } } = process

describe('createSpot', () => {
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
        let _id

        beforeEach(() =>
            User.create({ name, surname, email, password })
                .then(({ id }) => _id = id)
        )

        it('should succeed on correct data', () =>
            createSpot(_id, title, addressLocation, addressStNumber, addressOther, length, width, height, area, description, price, acceptsBarker, surveillance, isCovered, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun )
                .then(() =>
                    Promise.all([
                        User.findById(_id),
                        Spot.findOne({ publisherId: _id, title, addressLocation, addressStNumber, addressOther, length, width, height, area, description, price, acceptsBarker, surveillance, isCovered, hourStarts, hourEnds, mon, tue, wed, thu, fri, sat, sun })
                    ])
                )
                .then(([user, spot]) => {
                    expect(user).to.exist
                    expect(user.publishedSpots).to.contain(spot._id)
                    expect(spot).to.exist
                    expect(spot.title).to.equal(title)
                    expect(spot.addressLocation).to.equal(addressLocation)
                    expect(spot.addressStNumber).to.equal(addressStNumber)
                    expect(spot.addressOther).to.equal(addressOther)
                    expect(spot.length).to.equal(length)
                    expect(spot.width).to.equal(width)
                    expect(spot.height).to.equal(height)
                    expect(spot.area).to.equal(area)
                    expect(spot.description).to.equal(description)
                    expect(spot.price).to.equal(price)
                    expect(spot.acceptsBarker).to.equal(acceptsBarker)
                    expect(spot.surveillance).to.equal(surveillance)
                    expect(spot.isCovered).to.equal(isCovered)
                    expect(spot.hourStarts).to.equal(hourStarts)
                    expect(spot.hourEnds).to.equal(hourEnds)
                    expect(spot.mon).to.equal(mon)
                    expect(spot.tue).to.equal(tue)
                    expect(spot.wed).to.equal(wed)
                    expect(spot.thu).to.equal(thu)
                    expect(spot.fri).to.equal(fri)
                    expect(spot.sat).to.equal(sat)
                    expect(spot.sun).to.equal(sun)
                    expect(spot.publisherId.toString()).to.equal(_id)
                    expect(path.join(__dirname, `../data/spots/${spot.id}`)).to.be.a.directory()
                })
        )
    })

    it('should fail on incorrect fields within the spot type and content', () => {

        expect(() => createSpot(title, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => createSpot(title, true)).to.throw(TypeError, 'true is not a string')
        expect(() => createSpot(title, [])).to.throw(TypeError, ' is not a string')
        expect(() => createSpot(title, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createSpot(title, undefined)).to.throw(TypeError, 'undefined is not a string')
        
        expect(() => createSpot(title, '')).to.throw(ContentError, 'title is empty')
        expect(() => createSpot(title, ' \t\r')).to.throw(ContentError, 'title is empty')

        expect(() => createSpot(title, addressLocation, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => createSpot(title, addressLocation, true)).to.throw(TypeError, 'true is not a string')
        expect(() => createSpot(title, addressLocation, [])).to.throw(TypeError, ' is not a string')
        expect(() => createSpot(title, addressLocation, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createSpot(title, addressLocation, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createSpot(title, addressLocation, null)).to.throw(TypeError, 'null is not a string')
        
        expect(() => createSpot(title, addressLocation, '')).to.throw(ContentError, 'addressLocation is empty')
        expect(() => createSpot(title, addressLocation, ' \t\r')).to.throw(ContentError, 'addressLocation is empty')

        expect(() => createSpot(title, addressLocation, addressStNumber, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => createSpot(title, addressLocation, addressStNumber, true)).to.throw(TypeError, 'true is not a string')
        expect(() => createSpot(title, addressLocation, addressStNumber, [])).to.throw(TypeError, ' is not a string')
        expect(() => createSpot(title, addressLocation, addressStNumber, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createSpot(title, addressLocation, addressStNumber, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createSpot(title, addressLocation, addressStNumber, null)).to.throw(TypeError, 'null is not a string')
        
        expect(() => createSpot(title, addressLocation, addressStNumber, '')).to.throw(ContentError, 'addressStNumber is empty')
        expect(() => createSpot(title, addressLocation, addressStNumber, ' \t\r')).to.throw(ContentError, 'addressStNumber is empty')

        expect(() => createSpot(title, addressLocation, addressStNumber, addressOther, 1)).to.throw(TypeError, '1 is not a string')
        expect(() => createSpot(title, addressLocation, addressStNumber, addressOther, true)).to.throw(TypeError, 'true is not a string')
        expect(() => createSpot(title, addressLocation, addressStNumber, addressOther, [])).to.throw(TypeError, ' is not a string')
        expect(() => createSpot(title, addressLocation, addressStNumber, addressOther, {})).to.throw(TypeError, '[object Object] is not a string')
        expect(() => createSpot(title, addressLocation, addressStNumber, addressOther, undefined)).to.throw(TypeError, 'undefined is not a string')
        expect(() => createSpot(title, addressLocation, addressStNumber, addressOther, null)).to.throw(TypeError, 'null is not a string')
        
        expect(() => createSpot(title, addressLocation, addressStNumber, addressOther, '')).to.throw(ContentError, 'addressOther is empty')
        expect(() => createSpot(title, addressLocation, addressStNumber, addressOther, ' \t\r')).to.throw(ContentError, 'addressOther is empty')

    })

    after(() => Promise.all([User.deleteMany(), Spot.deleteMany()]).then(() => mongoose.disconnect()))
})