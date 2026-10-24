import { useState } from 'react'
import './App.css'

type Task = {
  id: number;
  title: string;
  completed: boolean;
}

const initialTasks: Array<Task> = [
  { id: 1, title: "Review project requirements", completed: false },
  { id: 2, title: "Build the Dashboard layout", completed: true },
  { id: 3, title: "Write my first React Component", completed: false },
  { id: 4, title: "Complete Mini Exercise", completed: false }
]

function App() {
  const [title, setTitle] = useState<string>("");
  const [tasks, setTasks] = useState<Array<Task>>(initialTasks);

  function addTask() {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    const newTask: Task = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
    }

    setTasks((currentTask) => [
      ...currentTask,
      newTask,
    ])

    setTitle('');
  }


  function toggleTask(taskId: number) {
    setTasks((currentTask) =>
      currentTask.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed }
          : task
      ))
  }


  return (
    <main>
      <h1>My Task Dashboard</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>
              {task.title} - {task.completed ? "Completed" : "Pending"}
            </span>
            <button type="button" onClick={() => toggleTask(task.id)}>
              {task.completed ? "Mark penging" : "Mark completed"}
            </button>
          </li>

        ))}
      </ul>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          addTask();
        }}>
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder='Enter a task...'
        />

        <button type="submit">Add Task</button>
      </form>
    </main>


  )
}

export default App
