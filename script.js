const add = document.getElementById("add")
const form = document.querySelector("form")
const input = document.getElementById("create")
const hidden = document.getElementById("hidden")
const todoList = document.getElementById("list")
const pending = document.getElementById("pending")
const themeBtn = document.getElementById("theme")
const footer = document.getElementById("footer")

// initial list
let list = JSON.parse(localStorage.getItem("list")) || []

let themeMode = true

// function to change theme
function changeTheme() {
    themeMode = !themeMode
    themeBtn.innerHTML = themeMode ? `<i class="bi bi-moon h4 "></i>` : `<i class="bi bi-brightness-high h4 "></i>`
    document.getElementById("todo").style.backgroundColor = themeMode ? "white" : "black"
    document.body.className = themeMode ? "light" : "dark"
    add.className = themeMode ? "btn btn-outline-dark" : "btn btn-outline-info"
    input.style.backgroundColor = themeMode ? "white" : "rgb(10, 10, 10)"
    input.style.borderColor = themeMode ? "black" : "cyan"
    input.style.color = themeMode ? "black" : "white"
    // to update display
    display()
}

// function to update display as the list changes
function display() {
    let display = ""
    list.forEach(ele => {
        display = display +
            `<div class="me-1 row justify-content-between align-items-center">
                <button class="col-1 btn" onclick="taskDone(${ele.id})"><i class="bi bi-check2 text-success h4"></i></button>
                <h4 class="${ele.done ? "text-decoration-line-through lead col-9" : "col-9"} ${themeMode ? "text-dark" : "text-light"}" id="${ele.id}">${ele.item}</h4>
                <button class="col-1 btn" id="edit" onclick="editItem(${ele.id})"><i class="bi bi-pencil text-info h6"></i></button>
                <button class="col-1 btn" id="delete" onclick="deleteItem(${ele.id})"><i class="bi bi-x text-danger h3"></i></button>
            </div>`
    })
    todoList.innerHTML = display
    pendingTasks()
}

display()

// to add to the list
add.addEventListener("click", (e) => {
    e.preventDefault()
    addTodo(input.value)
})

// function to add task to the list
function addTodo(inp) {

    // return if input is empty
    if (!input.value) return

    if (hidden.value === "") {
        // case for adding a new task

        // creating a new object corresponding to the task
        const newItem = {
            id: list.length + 1,
            item: inp,
            done: false,
        }
        // updating the list
        list = [...list, newItem]
        // updating local storage
        localStorage.setItem('list', JSON.stringify(list));

        // displaying updated list
        display()
        // reseting the inputs
        form.reset()
    } else {
        // case for updating a task
        let val = +hidden.value
        // updating the list
        let editedList = list.map(ele => {
            if (ele.id == val) {
                ele.item = input.value
            }
            return ele
        })
        list = [...editedList]
        localStorage.setItem('list', JSON.stringify(list));
        display()
        form.reset()
    }
}

// function to delete a task
function deleteItem(id) {

    let newList = list.filter(item => item.id !== id)

    // updating the index of each object to avoid objects having same id
    let orderedList = newList.map((ele, index) => {
        ele.id = index + 1
        return ele
    })
    list = [...orderedList]
    localStorage.setItem('list', JSON.stringify(list));
    display()
}

// function to edit a task
function editItem(id) {

    // populating the form with the values of corresponding id
    let currentItem = list.filter(item => item.id === id)
    input.value = currentItem[0].item
    hidden.value = currentItem[0].id
}

// function to indicate task completion
function taskDone(id) {
    // style change
    document.getElementById(id).classList.add("text-decoration-line-through", "lead")

    // updating the object done-value to true
    let pendingList = list.map(ele => {
        if (ele.id == id) {
            ele.done = true
        }
        return ele
    })
    list = [...pendingList]
    localStorage.setItem('list', JSON.stringify(list));
    display()
}

// function to indicate pending tasks and clear all button
function pendingTasks() {
    let pendingList = list.filter(ele => ele.done === false)
    footer.classList.remove(pendingList.length ? "d-none" : "d-flex")
    footer.classList.add(pendingList.length ? "d-flex" : "d-none")
    pending.innerHTML = `<h5 class=${themeMode ? "text-dark" : "text-light"}>Pending Tasks: <span class=${themeMode ? "text-danger" : "text-info"}>${pendingList.length}</span></h5>`
}

// function to clear all tasks
function clearAll() {
    list = []
    localStorage.setItem('list', JSON.stringify(list));
    display()
}

