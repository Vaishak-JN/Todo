const add = document.getElementById("add")
const form = document.querySelector("form")
const input = document.getElementById("create")
const hidden = document.getElementById("hidden")
const todoList = document.getElementById("list")
const pending = document.getElementById("pending")

let list = JSON.parse(localStorage.getItem("list")) || []

function display() {
    let display = ""
    list.forEach(ele => {
        display = display + `<div class="me-1 row justify-content-between align-items-center">
                                <button class="col-1 btn" onclick="taskDone(${ele.id})"><i class="bi bi-check2 text-success h4"></i></button>
                                <h4 class="${ele.done ? "text-decoration-line-through lead col-9" : "col-9"}" id="${ele.id}">${ele.item}</h4>
                                <button class="col-1 btn" id="edit" onclick="editItem(${ele.id})"><i class="bi bi-pencil text-info h5"></i></button>
                                <button class="col-1 btn" id="delete" onclick="deleteItem(${ele.id})"><i class="bi bi-x text-danger h3"></i></button>
                            </div>
                            `
    })
    todoList.innerHTML = display
    pendingTasks()
}

display()

add.addEventListener("click", (e) => {
    e.preventDefault()
    addTodo(input.value)
})

function addTodo(inp) {

    if (!input.value) return

    if (hidden.value === "") {
        const newItem = {
            id: list.length + 1,
            item: inp,
            done: false,
        }
        list = [...list, newItem]
        localStorage.setItem('list', JSON.stringify(list));
        console.log(newItem)
        display()
        form.reset()
    } else {
        let val = +hidden.value
        // console.log(val)
        let editedList = list.map(ele => {
            if (ele.id == val) {
                ele.item = input.value
            }
            return ele
        })
        // console.log(editedList)
        list = [...editedList]
        localStorage.setItem('list', JSON.stringify(list));
        display()
        form.reset()

    }
}

function deleteItem(id) {
    // console.log(id)
    let newList = list.filter(item => item.id !== id)
    let orderedList = newList.map((ele, index) => {
        ele.id = index + 1
        return ele
    })
    list = [...orderedList]
    // console.log(list)
    localStorage.setItem('list', JSON.stringify(list));
    display()
}

function editItem(id) {
    // console.log(id)
    let currentItem = list.filter(item => item.id === id)
    // console.log(currentItem[0].item)
    input.value = currentItem[0].item
    hidden.value = currentItem[0].id
}


function taskDone(id) {
    document.getElementById(id).classList.add("text-decoration-line-through", "lead")

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

function pendingTasks() {
    let pendingList = list.filter(ele => ele.done === false)
    pending.innerHTML = list.length === 0 ? "" : `<h4>You have <span class="text-danger">${pendingList.length}</span> pending tasks</h4>`
}



