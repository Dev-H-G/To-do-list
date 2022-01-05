const worksName = document.querySelector(".karha").querySelector("input");
const addworkButton = document.querySelector(".add");
const mainUl = document.querySelector(".doings");
const filterOption = document.querySelector(".filters");


addworkButton.addEventListener("click", addWorksUl);
mainUl.addEventListener("click", deleteCompletedTodo);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos)

function addWorksUl(event) {
    event.preventDefault();
    const mainContainer = document.createElement("div")
    mainContainer.classList.add("todo");

    const liForWorks = document.createElement("li");
    liForWorks.innerText = worksName.value;
    mainSaving(worksName.value);

    liForWorks.classList.add("todo-item");
    mainContainer.appendChild(liForWorks);
    worksName.value = ""; //that's for cleaning input after every todo add

    const checkIcon = document.createElement("button");
    checkIcon.classList.add("completed-btn");
    checkIcon.innerHTML = "<i class='fas fa-check'></i>";
    mainContainer.appendChild(checkIcon);

    const trashIcon = document.createElement("button");
    trashIcon.classList.add("trash-btn");
    trashIcon.innerHTML = "<i class='fas fa-trash'></i>";

    mainContainer.appendChild(trashIcon);
    mainContainer.style.display = "flex";
    mainUl.appendChild(mainContainer);

}

function deleteCompletedTodo(event) {
    const item = event.target;


    if (item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        console.log(todo);
        removeLocalStorage(todo);
        todo.remove();
    }

    if (item.classList[0] === "completed-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed")
    }
}

function mainSaving(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalStorage(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function filterTodo(event) {
    const todos = mainUl.childNodes;
    todos.forEach(function(todo) {
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "not-completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "none";
                } else {
                    todo.style.display = "flex";
                }
                break;


        }
    })
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {

        const mainContainer = document.createElement("div")
        mainContainer.classList.add("todo");

        const liForWorks = document.createElement("li");
        liForWorks.innerText = todo;


        liForWorks.classList.add("todo-item");
        mainContainer.appendChild(liForWorks);

        const checkIcon = document.createElement("button");
        checkIcon.classList.add("completed-btn");
        checkIcon.innerHTML = "<i class='fas fa-check'></i>";
        mainContainer.appendChild(checkIcon);

        const trashIcon = document.createElement("button");
        trashIcon.classList.add("trash-btn");
        trashIcon.innerHTML = "<i class='fas fa-trash'></i>";

        mainContainer.appendChild(trashIcon);
        mainContainer.style.display = "flex";
        mainUl.appendChild(mainContainer);

    })

}

//<img src = "icons/trash-bin.png"  class = "trash-icon" alt = "loading..." >
//`<img src = "icons/tick-icon.png" class = "check-icon"  alt = "loading..." > `;