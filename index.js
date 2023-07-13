const express = require('express')
const app = express()
app.use(express.json())

const morgan = require('morgan')
app.use(morgan('tiny'))

const cors = require('cors')
app.use(cors())


let persons = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/api/persons',(request, response) => {
  response.json(persons)
})

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short',
    timeZone: 'long'
  }
  options.timeZone = "EET";

app.get('/info',(request, response)=> {
  const numberOfPersons = persons.length
  const currentTime = new Date().toLocaleString('en-FI', options)
  response.send(`<p>Phonebook has info for ${numberOfPersons} people <\p> <p>${currentTime} (Eastern European Standard Time) <\p>`)
  console.log(`${currentTime}`)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const randomId = () => Math.random() * (1000000000 - persons.length) + persons.length

app.post('/api/persons/',(request, response) => {
  
  if (!request.body.name ) {
    return response.status(400).json({ 
      error: 'name is missing' 
    })
  } else if (!request.body.number){
    return response.status(400).json({ 
      error: 'number is missing' 
    })
  }else if (persons.find(entry => request.body.name === entry.name)){
    return response.status(400).json({ 
      error: 'name must be unique'
    })
  }
  

  const person = request.body
  person.id = randomId()
  persons = persons.concat(person)
  response.json(person)
  console.log(person)

})



  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })