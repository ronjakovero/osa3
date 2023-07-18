const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

  const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
    },
    number: {
        type: String, 
        minLength: 8,
        validate: {
            validator: function(v) {
            // number has length of 8 or more
                if (v.length < 8) {
                  return false
                }
            // first part should have two or three digits
                const firstPart = v.split('-')[0]
                if (firstPart.length !== 2 && firstPart.length !== 3) {
                return false
                }
            // second part should consists of numbers
                const secondPart = v.split('-')[1]
                if (isNaN(secondPart)) {
                return false
                }
                return true
                },
            message: props => `${props.value} is not a valid phone number! The phone number should have length of 8 or more and be formed of two parts that are separated by -, the first part has two or three numbers and the second part also consists of numbers`
          }
    },
  })

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Person', personSchema)