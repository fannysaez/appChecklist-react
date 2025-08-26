import { useState, useEffect } from 'react';
import AddTask from '../AddTask/AddTask';
import TaskItem from '../TaskItem/TaskItem';
import DeleteTask from '../DeleteTask/DeleteTask';
import './TaskList.css';

function TaskList() {
    // Initialisation des tâches depuis le localStorage ou valeurs par défaut
    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return [
                    { id: 1, label: 'Lire le brief du projet', done: false },
                    { id: 2, label: 'Faire un café bien mérité', done: false }
                ];
            }
        }
        return [
            { id: 1, label: 'Lire le brief du projet', done: false },
            { id: 2, label: 'Faire un café bien mérité', done: false }
        ];
    });
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [deletingTask, setDeletingTask] = useState(null);
    // Calcul dynamique du prochain ID à partir des tâches existantes
    const [nextId, setNextId] = useState(() => {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            try {
                const arr = JSON.parse(saved);
                if (Array.isArray(arr) && arr.length > 0) {
                    return Math.max(...arr.map(t => t.id)) + 1;
                }
            } catch { }
        }
        return 3;
    });
    // Sauvegarde des tâches dans le localStorage à chaque modification
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (label) => {
        const newTask = {
            id: nextId,
            label: label.trim(),
            done: false
        };
        setTasks(prev => [...prev, newTask]);
        setNextId(prev => prev + 1);
    };

    const deleteTask = (id) => {
        setTasks(prev => prev.filter(task => task.id !== id));
        setDeletingTask(null);
    };

    const toggleTask = (id) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, done: !task.done } : task
        ));
    };

    const updateTask = (id, newLabel) => {
        setTasks(prev => prev.map(task =>
            task.id === id ? { ...task, label: newLabel.trim() } : task
        ));
        setEditingTaskId(null);
    };

    const startEdit = (id) => {
        setEditingTaskId(id);
    };

    const cancelEdit = () => {
        setEditingTaskId(null);
    };

    const startDelete = (task) => {
        setDeletingTask(task);
    };

    const cancelDelete = () => {
        setDeletingTask(null);
    };

    // Statistiques
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.done).length;
    const pendingTasks = totalTasks - completedTasks;
    const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    return (
        <>
            <div className="task-list-container">
                <header className="task-list-header">
                    <h1 className="task-list-title">
                        Ma Liste de Tâches
                    </h1>
                    <p className="task-list-subtitle">
                        Organisez votre journée efficacement
                    </p>
                </header>

                <div className="task-stats">
                    <div className="stat-card">
                        <span className="stat-number">{totalTasks}</span>
                        <span className="stat-label">Total</span>
                    </div>
                    <div className="stat-card stat-card--success">
                        <span className="stat-number">{completedTasks}</span>
                        <span className="stat-label">Terminées</span>
                    </div>
                    <div className="stat-card stat-card--warning">
                        <span className="stat-number">{pendingTasks}</span>
                        <span className="stat-label">En cours</span>
                    </div>
                </div>

                <AddTask onAdd={addTask} />

                <div className="tasks-section">
                    {tasks.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">📝</div>
                            <h3>Aucune tâche pour le moment</h3>
                            <p>Ajoutez votre première tâche pour commencer !</p>
                        </div>
                    ) : (
                        <ul className="TaskList">
                            {tasks.map((task) => (
                                <TaskItem
                                    key={task.id}
                                    task={task}
                                    isEditing={editingTaskId === task.id}
                                    onToggle={toggleTask}
                                    onEdit={updateTask}
                                    onStartEdit={startEdit}
                                    onCancelEdit={cancelEdit}
                                    onDelete={startDelete}
                                />
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Barre de progression sous la checklist, pleine largeur */}
            <div className="progress-bar-wrapper">
                <div className="progress-bar">
                    <div
                        className="progress-fill"
                        style={{ width: `${completionRate}%` }}
                    />
                </div>
                <div className="progress-label">Progression : {completionRate}%</div>
            </div>

            {deletingTask && (
                <DeleteTask
                    task={deletingTask}
                    onConfirm={deleteTask}
                    onCancel={cancelDelete}
                />
            )}
        </>
    );
}

export default TaskList;
