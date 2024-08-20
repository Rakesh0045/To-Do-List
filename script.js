let todo = JSON.parse(localStorage.getItem("todo")) || [];

document.addEventListener("DOMContentLoaded", function() {
    const todoInput = document.getElementById("todoInput");
    const addButton = document.getElementById("addButton");
    const deleteAllButton = document.getElementById("deleteAllButton");
    const todoList = document.getElementById("todoList");
    const todoCount = document.getElementById("todoCount");

    function saveToLocalStorage() {
        localStorage.setItem("todo", JSON.stringify(todo));
    }

    function displayTasks() {
        todoList.innerHTML = "";
        todo.forEach((item, index) => {
            const li = document.createElement("li");
            li.className = item.completed ? "completed" : "";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = item.completed;
            checkbox.addEventListener("change", () => toggleTask(index));

            const text = document.createElement("p");
            text.textContent = item.text;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.addEventListener("click", () => deleteTask(index));

            li.appendChild(checkbox);
            li.appendChild(text);
            li.appendChild(deleteButton);
            todoList.appendChild(li);
        });
        todoCount.textContent = todo.length;
    }

    function addTask() {
        const newTask = todoInput.value.trim();
        if (newTask !== "") {
            todo.push({ text: newTask, completed: false });
            saveToLocalStorage();
            todoInput.value = "";
            displayTasks();
        }
    }

    function toggleTask(index) {
        todo[index].completed = !todo[index].completed;
        saveToLocalStorage();
        displayTasks();
    }

    function deleteTask(index) {
        todo.splice(index, 1);
        saveToLocalStorage();
        displayTasks();
    }

    function deleteAllTasks() {
        todo = [];
        saveToLocalStorage();
        displayTasks();
    }

    addButton.addEventListener("click", addTask);
    todoInput.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
    deleteAllButton.addEventListener("click", deleteAllTasks);

    displayTasks();
});
