const inputBox = document.getElementById("inputBox");
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");

let editTodo = null;

// Function to add TO DO
const addTodo = () => {
  const inputText = inputBox.value.trim();
  if (inputText.length <= 0) {
    alert("You must write something To Do");
    return false;
  }

  if (addBtn.value === "Edit") {
    let index = editTodo.target.previousElementSibling.innerHTML;
    editTodo.target.previousElementSibling.innerHTML = inputText;
    editLocalTodos(index);
    addBtn.value = "Add";
    inputBox.value = "";
  }

  else {
    // creating P tag
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);


    // Creating edit button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.classList.add("btn", "editBtn")
    li.appendChild(editBtn)

    // Creating delet Button
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "Remove";
    deleteBtn.classList.add("btn", "deleteBtn");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    inputBox.value = "";

    // saveLocalTodos(inputText);
    saveLocalTodo(inputText);
  }
};

// Function to Update : (Edit, Delete) TO DO
const updateTodo = (e) => {
  // console.log(e.target.innerHTML)
  if (e.target.innerHTML === "Remove") {
    // console.log(e.target.parentElement);
    todoList.removeChild(e.target.parentElement);
    deletLocalTodos(e.target.parentElement);
  }

  if (e.target.innerHTML === "Edit") {
    inputBox.value = e.target.previousElementSibling.innerHTML;
    inputBox.focus();
    addBtn.value = "Edit";
    editTodo = e;


  }

}

// const saveLocalTodos = (todo)=>{
//   let todos = [];
//   todos.push(todo);
//   console.log(todos)
// }

// Function to save Local Todo
const saveLocalTodo = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = []
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));

}

// Function to get Local Todos
const getLocalTodos = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(todo => {

      // creating P tag
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);


      // Creating edit button
      const editBtn = document.createElement("button");
      editBtn.innerHTML = "Edit";
      editBtn.classList.add("btn", "editBtn")
      li.appendChild(editBtn)

      // Creating delet Button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Remove";
      deleteBtn.classList.add("btn", "deleteBtn");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });

  }
}

// Function to delet local todos
const deletLocalTodos = (todo) => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = []
  }
  else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let todoText = todo.children[0].innerHTML;
  let todoIndex = todos.indexOf(todoText);
  todos.splice(todoIndex, 1);
  localStorage.setItem("todos", JSON.stringify(todos))
  //  Array function : slice/splice

  console.log(todoIndex);
}

const editLocalTodos = (todo) => {
  console.log(todo)

  let todos = JSON.parse(localStorage.getItem("todos"));
  console.log(todos)
  let todoIndex = todos.indexOf(todo);
  todos[todoIndex] = inputBox.value;
  localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos)
addBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", updateTodo);


// pause 58 minute agin working  updateTodo 