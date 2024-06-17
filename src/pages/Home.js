import React, { Component } from "react";
import Todos from "../component/todos";
import AddTodo from "../component/AddTodo";
import "../pages/Home.css";
import { Card, Grid, ListItemButton, ListItemText, Checkbox } from "@mui/material";


class Home extends Component {
  // Create a default state of this component with an empty list of todos.
  constructor() {
    super();
    this.state = {
      todos: [],
      completedTodos: []
    };
  }
  // the addTodo function simply creates a new array that includes the user submitted todo item and then
  // updates the state with the new list.
  addTodo = (todo) => {
    if (!(this.state.todos.find(item => item.content === todo.content))) {
      // In React, keys or ids in a list help identify which items have changed, been added or removed. Keys
      // should not share duplicate values.
      // To avoid having dup values, we use the Math.random() function to generate a random value for a todo id.
      // This solution works for a small application but a more complex hashing function should be used when
      // dealing with a larger data sensitive project.
      todo.id = Math.random();
      // Create a array that contains the current array and the new todo item
      let new_list = [...this.state.todos, todo];
      // Update the local state with the new array.
      this.setState({
        todos: new_list,
      });
    }
    else {
      alert("This item already exists in the current list.");
    }
  };

  deleteTodo = (item, completed) => {
    // if (!completed) {
    const todos = this.state.todos.filter((todo) => {
      return todo.id !== item.id;
    });

    this.state.completedTodos.push(item);
    // console.log("completed " + this.state.completedTodos);
    this.setState({
      todos: todos,
      completedTodos: this.state.completedTodos
    });
    this.showCompleted(this.state.completedTodos);
    // }
  };

  showCompleted = (dones) => {
    const doneList = dones.length ? (
      dones.map((done) => {
        return (
          <Grid key={done.id}>
            <Card>
              {/* Remember, we set the local state of this todo item when the user submits the form in 
              AddTodo.js. All we need to do is return the todo list item {todo.content} */}
              <ListItemButton component="a" href="#simple-list">
                <ListItemText primary={done.content} secondary={done.date} style={{ marginTop: 10 }} />
              </ListItemButton>
            </Card>
          </Grid>
        );
      })
    ) : (
      <p>You have not completed any todo's.</p>
    );
    // Lastly, return the todoList constant that we created above to show all of the items on the screen.
    return (
      <div className="todoCollection" style={{ padding: "10px" }}>
        <h1>Completed Todo's</h1>
        {doneList}
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        <h1>Todo's </h1>
        {/* When passing the AddTodo component, addTodo is a prop that is used in the 
        AddTodo.js file when handling the submit */}
        <AddTodo addTodo={this.addTodo} />
        {/* When returning the Todos component, todos is a prop passed to the todos.js file
         to format and render the current todo list state */}
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
        <h1>Completed Todo's</h1>
        <Todos todos={this.state.completedTodos} deleteTodo={this.deleteTodo} />
        {/* <this.showCompleted dones={this.state.completedTodos} /> */}

      </div>
    );
  }
}

export default Home;
