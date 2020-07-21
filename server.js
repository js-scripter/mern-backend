const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose=require('mongoose')
const PORT=4000
const todoRoutes = express.Router()
let todos = [
    {_id:1, todo_description:'1111', todo_completed:'NO'},
    {_id:2, todo_description:'2222', todo_completed:'NO'}
]

app.use(cors())
app.use(bodyParser.json())

// mongoose.connect('mongodb://127.0.0.1/27017/todos',{useNewUrlParser:true})
// const connection = mongoose.connect

// connection.once('open',()=>{
//     console.log('connected to mongo db')
// })

todoRoutes.route('/').get((req,res)=>{
    res.json(        todos    )
})

todoRoutes.route('/:id').get((req,res)=>{
    let id=req.params.id
    const result = todos.filter(todo => todo._id == id);
    res.json(result)
})

todoRoutes.route('/add').post((req,res)=>{
    let todo = req.body
    todos.push(todo)
    res.status(200).json({'todo':'added'})
})
todoRoutes.route('/update/:id').post((req,res)=>{
    let id=req.params.id
    let updated = req.body
    updated._id = id
    const findId = (todo) => todo._id== id ;
    let i = todos.findIndex(findId)
    todos[i]=updated
    res.json('todo updated')
})

app.use('/todos', todoRoutes)
app.listen(PORT,()=>{
    console.log('server running on ' + PORT)
})