import { v4 as uuidV4} from 'uuid';
console.log(uuidV4());

type Task = {
    id: string 
    title: string  
    completed: boolean 
    createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.querySelector<HTMLFormElement>("#task-form")
const input = document.getElementById("new-task") as HTMLInputElement | null


const tasks: Task[] = lodeTasks()
tasks.forEach(addListItem)

form?.addEventListener ("submit" , e=> {
    e.preventDefault()

    if(input?.value == "" || input?.value == null) return

    const newTask: Task = {
        id: uuidV4(),
        title: input.value,
        completed: false,
        createdAt: new Date()
    }
    tasks.push(newTask)
    saveTasks()

    addListItem(newTask)
    input.value = ""
})

function addListItem(task: Task) {
    const item = document.createElement("li")
    const lable = document.createElement("label")
    const checkbox = document.createElement("input")
    checkbox.addEventListener("change" , () => {
        task.completed = checkbox.checked
        saveTasks()
        // console.log(tasks)
    })
    checkbox.type = "checkbox"
    checkbox.checked = task.completed
    lable.append(checkbox, task.title)
    item.append(lable)
    list?.append(item)
}

function saveTasks(){
    localStorage.setItem("Tasks", JSON.stringify(tasks))
}

function lodeTasks(): Task[] {
    const taskJSON = localStorage.getItem("Tasks")
    if (taskJSON == null) return []
    return JSON.parse(taskJSON)
}