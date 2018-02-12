//import user from 'user'


const mongoose = require('mongoose')
//const user = require('./user')
//const kayttaja = process.env.kayttaja || user.user()
//const passu = process.env.passu || user.password()
//console.log(kayttaja, passu)





const url = 'mongodb://fsweso:mangusti@ds233238.mlab.com:33238/fs-puhluettelo'
//const url = 'mongodb://${kayttaja}:${passu}@ds233238.mlab.com:33238/fs-puhluettelo'
//mongoose.connect(url)

//const genId = () => {
//    return Math.floor(Math.random() * Math.floor(1000000));
//}

const Person = mongoose.model('Person', {
  name: String,
  content: String,
  id: String
  
})

const formatPerson = (person) => {
    return{
        name: person.name,
        content: person.content,
        id: person._id

    }
}

const storePerson = (name, number) => {
    mongoose.connect(url)
    if(process.argv[3]){

    const person = new Person({
        name: name,
        content: number,
        
    })

    formatPerson(person)
    //console.log(person.name, person.content)
    

    person
        .save()
        .then(response => {
            //console.log(response)
            console.log(`Henkilö ${person.name} tallennettu tietokantaan numerolla ${person.content}.`)
            mongoose.connection.close()
        })
    }else{
        Person
        .find({})
        .then(result => {
            console.log("Puhelinluettelo:");
            result.forEach(person => {
                console.log(`${person.name} ${person.content}`);
            })
            mongoose.connection.close()
        })
    }
}

storePerson(process.argv[2], process.argv[3])