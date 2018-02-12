const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')


morgan.token('body-content', function (req, res) { return JSON.stringify(req.body) })
//MUISTA lisätä nää alla olevat myös!
app.use(bodyParser.json())
app.use(morgan(':method :url :body-content :status :res[content-length] - :response-time ms'))
app.use(cors())
app.use(express.static('build'))


let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Martti Tienari",
        number: "040-123456",
        id: 2
    },
    {
        name: "Arto Järvinen",
        number: "040-123456",
        id: 3
    },
    {
        name: "Lea Kutvonen",
        number: "040-123456",
        id: 4
    }
]

const genId = () => {
    return Math.floor(Math.random() * Math.floor(1000000));
}

app.get('/', (req, res) => {
    res.send('<h1>Puhelinluettelo</h1>')
  })

  app.get('/info', (req, res) => {
    const info = `Puhelinluettelossa ${persons.length} henkilön tiedot `
    res.send(
        `<p>${info}</p>
        <p>${new Date()}</p>`
    )
})

  
  app.get('/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/persons/:id',(req,res) =>{
      const id = Number(req.params.id)
      const person = persons.find(person => person.id === id)
      if(person){
        res.json(person)
      }else{
          res.status(404).end()
      }

  })

  app.post('/persons/', (req,res) =>{
      const raja = persons.length > 0 ? persons.map(p => p.id).sort().reverse()[0] : 0
      const body = req.body
      if(!body.name){
          return res.status(400).json({error: 'name missing'})
      }if(!body.number){
        return res.status(400).json({error: 'number missing'})
    }
    
    for(let i=0;i<raja;i++){
        if(persons[i].name===body.name){
            return res.status(400).json({error: 'name must be unique'})
        }
    }

      const person ={
          name:body.name,
          number:body.number,
          id: genId()
      }


      persons = persons.concat(person)
      res.json(person)
  })

  app.delete('/persons/:id', (req,res) =>{
    const id = Number(req.params.id)
    notes = persons.filter(person => person.id !== id)

    res.status(204).end()
  })
  
  const PORT = process.env.port || 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })