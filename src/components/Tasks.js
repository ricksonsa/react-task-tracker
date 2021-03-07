import Task from "./Task"


const Tasks = ({tasks, onDelete, onToggle}) => {
    
    return (
        <div>
            { tasks.map((task) => (<Task key={task.id} task={task} onToggle={onToggle} onDelete={onDelete}></Task>)) }
        </div>
    )
}

export default Tasks
