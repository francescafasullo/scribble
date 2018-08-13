'use strict'

const db = require('APP/db')
    , {User, Notebook, Note, Promise} = db
    , {mapValues} = require('lodash')

function seedEverything() {
  const seeded = {
    users: users()
  }

  seeded.notebooks = notebooks(seeded)
  seeded.notes = notes(seeded)

  return Promise.props(seeded)
}

const users = seed(User, {
  francesca: {
    email: 'francescafasullo@example.com',
    name: 'Francesca Fasullo',
    password: '1234',
  },
  barack: {
    name: 'Barack Obama',
    email: 'barack@example.gov',
    password: '1234'
  },
})

const notebooks = seed(Notebook, ({users}) => ({
  gardening: {name: 'Gardening', user_id: users.francesca.id},
  coding: {name: 'Coding', user_id: users.francesca.id},
  travel: {name: 'Travel', user_id: users.francesca.id}
}))

const notes = seed(Note, ({notebooks}) => ({
  gardening1: {name: 'Perennials', text: 'Water your perennials well after you plant them. Then lay a 2- to 3-inch-deep layer of mulch over the soil around your new plants. The mulch will help the soil hold moisture and prevent weeds from growing.', notebook_id: notebooks.gardening.id},
  gardening2: {name: 'Being An Urban Gardener: Creating A City Vegetable Garden', text: 'Growing vegetables in containers is one of the easiest ways to create a city vegetable garden. With containers, you can grow anything from lettuce and tomatoes to beans and peppers. You can even grow potatoes and vine crops, such as cucumbers. As long as there is adequate drainage, nearly anything can be used to grow vegetables.', notebook_id: notebooks.gardening.id},
  gardening3: {name: 'Mini Succulent Garden Ideas', text: 'You can really use just about any glue to adhere your succulents and moss to the planter you are using. However, after trying a variety of glues, I found that Oasis Floral Adhesive is far and away the easiest option to work with and keeps the succulents most secure.', notebook_id: notebooks.gardening.id},
  coding1: {name: 'How To Start Learning Javascript', text: 'If you are hoping to learn to code in 2017, become a front-end/full-stack/web/software developer, join a coding bootcamp, start building your own websites, or just want to learn more about JavaScript, hopefully the list of resources below helps you achieve your goals!', notebook_id: notebooks.coding.id},
  coding2: {name: 'App Ideas', text: '#1 Scan and Shop apps that let you scan any items to find it online by the image so you can search and buy them from the online shopping sites easily. You can add more features to make the app more interesting and useful. #2 Intelligent cooking app that will ask for ingredient names from the user and will recommend/suggest a dish that can be prepared with those items. It’d be very useful when you are looking to make a nice dish with the available ingredients.', notebook_id: notebooks.coding.id},
  travel1: {name: 'Top Travel Destinations for 2019', text: 'Paris, Yellowstone, Rome, Tahiti, London', notebook_id: notebooks.travel.id},
  travel2: {name: 'How To Stay On Budget While Traveling', text: 'The first step to staying within your budget when traveling is to establish one, says Andrew Schrage, editor-in-chief of personal finance website MoneyCrashers. It should be detailed and complete, from airfare to souvenirs to entertainment. In that same vein, you should also decide on what’s most important to you. It might be securing memorable items to remember your trip or great meals at local restaurants. Be sure to plan out available funds according to those needs.', notebook_id: notebooks.travel.id}
}))

if (module === require.main) {
  db.didSync
    .then(() => db.sync({force: true}))
    .then(seedEverything)
    .finally(() => process.exit(0))
}

class BadRow extends Error {
  constructor(key, row, error) {
    super(error)
    this.cause = error
    this.row = row
    this.key = key
  }

  toString() {
    return `[${this.key}] ${this.cause} while creating ${JSON.stringify(this.row, 0, 2)}`
  }
}

// seed(Model: Sequelize.Model, rows: Function|Object) ->
//   (others?: {...Function|Object}) -> Promise<Seeded>
//
// Takes a model and either an Object describing rows to insert,
// or a function that when called, returns rows to insert. returns
// a function that will seed the DB when called and resolve with
// a Promise of the object of all seeded rows.
//
// The function form can be used to initialize rows that reference
// other models.
function seed(Model, rows) {
  return (others={}) => {
    if (typeof rows === 'function') {
      rows = Promise.props(
        mapValues(others,
          other =>
            // Is other a function? If so, call it. Otherwise, leave it alone.
            typeof other === 'function' ? other() : other)
      ).then(rows)
    }

    return Promise.resolve(rows)
      .then(rows => Promise.props(
        Object.keys(rows)
          .map(key => {
            const row = rows[key]
            return {
              key,
              value: Promise.props(row)
                .then(row => Model.create(row)
                  .catch(error => { throw new BadRow(key, row, error) })
                )
            }
          }).reduce(
            (all, one) => Object.assign({}, all, {[one.key]: one.value}),
            {}
          )
        )
      )
      .then(seeded => {
        console.log(`Seeded ${Object.keys(seeded).length} ${Model.name} OK`)
        return seeded
      }).catch(error => {
        console.error(`Error seeding ${Model.name}: ${error} \n${error.stack}`)
      })
  }
}

module.exports = Object.assign(seed, {users, notebooks, notes})
