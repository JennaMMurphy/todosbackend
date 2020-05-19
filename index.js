const express = require('express')
const app = express()
var cors = require('cors')

app.use(cors())

app.use(express.json())

const todosList = [
    {id:1, name: 'Take out the trash'},
    {id:2, name: 'Walk the dog'},
    {id:3, name: 'Vacuum the floor'}
]
app.get('/', (req, res) => {
    res.send('Hello world')
})

app.get('/api/todos', (req, res) => {
    res.send(todosList)
})

app.get('/api/todos/:id', (req, res)=>{
    const todos = todosList.find(c =>c.id === parseInt(req.params.id))
    if (!todos) res.status(404).send("OOOPS it doesn't exist")
    res.send(todos)
 })

app.post('/api/todos', (req, res) => {
    const todos ={
        id: todosList.length +1,
        name: req.body.name
    }
    todosList.push(todos)
    res.send(todosList)
})


const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`app listening to port ${port}`)
})

// app.put('/api/todos/:id', (req, res) => {
//     const todos = todosList.find(c => c.id === parseInt(req.params.id))
//     if(!todos) res.status(404).send("oops it doesn't exist")

//     if(!req.body.name || req.body.name < 3){
//         res.status(400).send('Please enter a name with at least 3 characters')
//         return
//     }
//     todos.name = req.body.name
//     res.send(todos)
// })

app.delete('/api/todos/:id', (req, res) => {
    const todos = todosList.find(c => c.id === parseInt(req.params.id))
    if(!todos) res.status(404).send("oops it doesn't exist") 
    const index = todosList.indexOf(todos)
    todosList.splice(index, 1)
    res.send(todosList)
})
