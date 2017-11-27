const express = require('express');
const bodyParser = require('body-parser');
const uuidV4 = require('uuid.v4');
const cors = require('cors');

const app = express();
let todoList = [];
app.use(cors({ origin: 'http://localhost:4200', credentials :  true }));
app.use(bodyParser.json());
app.get('/todos', (req, res) => res.send(todoList))

app.get('/todos/:id', (req, res) => {
  let result = false;
  todoList.forEach((todo) => {
      console.log(todo);
      if(todo.id === req.params.id){
        result = todo;
      }
  });
  return res.send(result);
})

app.post('/todos', (req, res) => {
  const todo = {
      id: uuidV4(),
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      dueDate: req.body.dueDate,
  }
  todoList.push(todo);
  return res.send(todo);
});

app.put('/todos/:id', function (req, res) {
  const id = req.params.id;
  const newtodo = {
      id,
      name: req.body.name,
      description: req.body.description,
      date: req.body.date,
      dueDate: req.body.dueDate,
  };

  todoList = todoList.map((todo) => {
      if (todo.id === id) {
        return newtodo;
      }
      return todo;
    });
  return res.send(true);
})

app.delete('/todos/:id', function (req, res) {
  todoList = todoList.filter((todo) => todo.id !== req.params.id);
  return res.send(true);
})



app.listen(3000, () => console.log('Example app listening on port 3000!'))
