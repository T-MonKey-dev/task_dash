import { useState } from 'react'
import './styles/main.css';

type Task = {
  id: number;
  title: string;
  completed: boolean;
}

type TaskFilter = "all" | "pending" | "completed";

const initialTasks: Array<Task> = [
  { id: 1, title: "Review project requirements", completed: false },
  { id: 2, title: "Build the Dashboard layout", completed: true },
  { id: 3, title: "Write my first React Component", completed: false },
  { id: 4, title: "Complete Mini Exercise", completed: false }
]

function App() {
  const [title, setTitle] = useState<string>("");
  const [tasks, setTasks] = useState<Array<Task>>(initialTasks);
  const [filter, setFilter] = useState<TaskFilter>("all");
  const completedCount = tasks.filter(
    (task) => task.completed
  ).length;


  const pendingCount = tasks.filter(
    (task) => !task.completed
  ).length;

  const visiableTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed
    if (filter === "pending") return !task.completed
    return true;

  })
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
      <section className="dashboard-section">
        <h2 className="dashboard-section-title">
          Add A Task
        </h2>
        <form className="task-form"
          onSubmit={(event) => {
            event.preventDefault();
            addTask();
          }}>
          <input
            className="tast-form__input"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder='Enter a task...'
          />

          <button className="task-form__button" type="submit">Add Task</button>
        </form>
      </section>

      <section className='task-summary' aria-label="Task summary">
        <article className="task-summary__card">
          <h3 className="task-summary__label">Total tasks</h3>
          <p className="task-summary__value">{tasks.length}</p>
        </article>
        <article className="task-summary__card">
          <h3 className="task-summary__label">Completed</h3>
          <p className="task-summary__value">{completedCount}</p>
        </article>
        <article className="task-summary__card">
          <h3 className="task-summary__label">Pending</h3>
          <p className="task-summary__value">{pendingCount}</p>
        </article>
      </section>

      <h1>My Task Dashboard</h1>

      <p>Pending: {pendingCount}</p>

      <section className="dashboard-section">
        <h2 className="daskboard-section-title">
          Your Tasks
        </h2>
        <div className="task-filters" role='group' aria-label="Filter tasks">
          <button className={`task-filters__button ${filter === 'all' ? 'task-filters__button--active' : ''}`} aria-pressed={filter === "all"} type="button" onClick={() => setFilter('all')}>
            All
          </button>

          <button className={`task-filters__button ${filter === 'pending' ? 'task-filters__button--active' : ''}`} aria-pressed={filter === "pending"} type="button" onClick={() => setFilter('pending')}>
            Pending
          </button>

          <button className={`task-filters__button ${filter === 'completed' ? 'task-filters__button--active' : ''}`} aria-pressed={filter === "completed"} type="button" onClick={() => setFilter('completed')}>
            Completed
          </button>

        </div>

        {visiableTasks.length === 0 ? (
          <p className="task_list__empty">
            No tasks to display. Try another filter or add a new task.
          </p>
        ) : (
          <ul className="task-list">
            {visiableTasks.map((task) => (
              <li key={task.id} className={`task-list__item ${task.completed ? 'task-list__item--completed' : ''
                }`}>
                <span>
                  {task.title} - {task.completed ? "Completed" : "Pending"}
                </span>
                <button type="button" onClick={() => toggleTask(task.id)}>
                  {task.completed ? "Mark pending" : "Mark completed"}
                </button>
              </li>

            ))}
            </ul>

        )}
      </section>
    </main>


  )
}

export default App
